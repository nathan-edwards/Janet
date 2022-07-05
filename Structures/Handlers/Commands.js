require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Perms } = require("../Validation/Permissions");

module.exports = async (client, PG, Ascii) => {
  client.handleCommands = async (commandFolders, path) => {
    const Table = new Ascii("Commands Loaded");
    client.commandArray = [];
    for (folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (file of commandFiles) {
        const command = require(`../../Commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
        Table.addRow(command.data.name, "✅ LOADED");
      }
    }

    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.ENV === "PRODUCTION") {
          console.log("\nStarted refreshing application (/) commands.");
          await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: client.commandArray,
          });
        } else {
          console.log(
            "\nStarted refreshing application (/) commands for Guild."
          );
          await rest.put(
            Routes.applicationGuildCommands(
              process.env.CLIENT_ID,
              process.env.GUILD_ID
            ),
            { body: client.commandArray }
          );
        }
      } catch (e) {
        console.error(e);
      }
    })();
    console.log("Successfully reloaded application (/) commands.\n");
    console.log(Table.toString());
  };
};
