import {
  ApplicationCommandType,
  Collection,
  Client,
  ClientOptions,
  EmbedBuilder,
  Routes,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  PermissionsBitField,
} from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Logger from "./Logger.js";
import config from "../config.js";
import { ShoukakuClient, Queue } from "./index.js";
import { Utils } from "../utils/Utils.js";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class Janet extends Client {
  public commands: Collection<string, any> = new Collection();
  public components: Collection<string, any> = new Collection();
  public aliases: Collection<string, any> = new Collection();
  public prisma = new PrismaClient();
  public cooldowns: Collection<string, any> = new Collection();
  public config = config;
  public logger: Logger = new Logger();
  public readonly color = config.color;
  private body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  public shoukaku: ShoukakuClient;
  public utils = Utils;
  public queue = new Queue(this);
  public constructor(options: ClientOptions) {
    super(options);
    this.shoukaku = new ShoukakuClient(this);
  }
  public embed(): EmbedBuilder {
    return new EmbedBuilder();
  }
  public async start(token: string): Promise<string> {
    this.logger.info(`Loading commands...`);
    this.loadCommands(process.env.npm_config_disco ? ['music'] : fs.readdirSync(path.join(__dirname, "../commands")).filter(dir => dir !== 'music'));
    this.logger.success(`Successfully loaded commands!`);
    this.logger.info(`Loading events...`);
    this.loadEvents(process.env.npm_config_disco ? ['player', 'client'] : fs.readdirSync(path.join(__dirname, "../events")).filter(dir => dir !== 'player'));
    this.logger.success(`Successfully loaded events!`);
    this.logger.info(`Loading components...`);
    this.loadComponents(fs.readdirSync(path.join(__dirname, "../components")));
    this.logger.success(`Successfully loaded components!`);
    this.logger.info(`Connecting to the database...`);
    this.prisma
      .$connect()
      .then(() => {
        this.logger.success(`Connected to the database!`);
      })
      .catch((err) => {
        this.logger.error(`Unable to connect to the database!`);
        this.logger.error(err);
      });
    return await this.login(token);
  }

  private loadCommands(commandsPath: any[]): void {
    commandsPath.forEach((dir: any) => {
      const commandFiles = fs
        .readdirSync(path.join(__dirname, `../commands/${dir}`))
        .filter((file) => file.endsWith(".js"));
      commandFiles.forEach(async (file) => {
        const cmd = (await import(`../commands/${dir}/${file}`)).default;
        const command = new cmd(this, file);
        command.category = dir;
        command.file = file;
        this.commands.set(command.name, command);
        if (command.aliases.length !== 0) {
          command.aliases.forEach((alias: any) => {
            this.aliases.set(alias, command.name);
          });
        }
        if (command.slashCommand) {
          const data = {
            name: command.name,
            description: command.description.content,
            type: ApplicationCommandType.ChatInput,
            options: command.options ? command.options : null,
            name_localizations: command.nameLocalizations
              ? command.nameLocalizations
              : null,
            description_localizations: command.descriptionLocalizations
              ? cmd.descriptionLocalizations
              : null,
            default_member_permissions:
              command.permissions.user.length > 0
                ? command.permissions.user
                : null,
          };
          if (command.permissions.user.length > 0) {
            const permissionValue = PermissionsBitField.resolve(
              command.permissions.user
            );
            if (typeof permissionValue === "bigint") {
              data.default_member_permissions = permissionValue.toString();
            } else {
              data.default_member_permissions = permissionValue;
            }
          }
          const json = JSON.stringify(data);
          this.body.push(JSON.parse(json));
        }
      });
    });
    this.once("ready", async () => {
      this.logger.info(`Loading slash commands...`);
      const applicationCommands =
        this.config.production === true
          ? Routes.applicationCommands(this.config.clientId ?? "")
          : Routes.applicationGuildCommands(
            this.config.clientId ?? "",
            this.config.guildId ?? ""
          );
      try {
        const rest = new REST({ version: "9" }).setToken(
          this.config.token ?? ""
        );
        await rest.put(applicationCommands, { body: this.body });
        this.logger.success(`Successfully loaded slash commands!`);
        this.logger.success(`*boop* Hi There, I'm ${this.user.username}!`);
      } catch (error) {
        this.logger.error(error);
      }
    });
  }

  private loadEvents(eventsPath: any[]): void {
    eventsPath.forEach((dir: any) => {
      const events = fs
        .readdirSync(path.join(__dirname, `../events/${dir}`))
        .filter((file) => file.endsWith(".js"));
      events.forEach(async (file) => {
        const event = (await import(`../events/${dir}/${file}`)).default;
        const evt = new event(this, file);
        switch (dir) {
          case "player":
            this.shoukaku.on(evt.name, (...args) => evt.run(...args));
            break;
          default:
            this.on(evt.name, (...args) => evt.run(...args));
            break;
        }
      });
    });
  }

  private loadComponents(componentsPath: any[]): void {
    componentsPath.forEach((dir: any) => {
      const components = fs
        .readdirSync(path.join(__dirname, `../components/${dir}`))
        .filter((file) => file.endsWith(".js"));
      components.forEach(async (file) => {
        const component = (await import(`../components/${dir}/${file}`))
          .default;
        const comp = new component(this, file);
        this.components.set(comp.name, comp);
      });
    });
  }
}
