import { Command, Janet, Context } from "../../structures/index.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../../config.js";

export default class Invite extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "invite",
      description: {
        content: "Sends the bot's invite link",
        examples: ["invite"],
        usage: "invite",
      },
      category: "info",
      aliases: ["inv"],
      cooldown: 3,
      args: false,
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [],
    });
  }
  public async run(client: Janet, ctx: Context, args: string[]): Promise<void> {
    const embed = this.client.embed();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Janet")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=8&scope=bot%20applications.commands`
        )
    );

    return ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setDescription(
            `[Invite Janet](https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=8&scope=bot%20applications.commands)`
          ),
      ],
      components: [row],
    });
  }
}
