const { Perms } = require("../Validation/Permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Commands Loaded");

  const CommandsArray = [];

  (await PG(`${process.cwd().replace(/\\/g, "/")}/Commands/**/*.js`)).map(
    async (file) => {
      const command = require(file);

      if (!command.name)
        return Table.addRow(file.split("/")[7], "🛑 FAILED", "Missing a name.");

      if (!command.context && !command.description)
        return Table.addRow(
          file.split("/")[7],
          "🛑 FAILED",
          "Missing a description."
        );

      if (command.permission) {
        if (Perms.includes(command.permission))
          command.defaultPermission = false;
        else
          return Table.addRow(command.name, "🛑 FAILED", "Invalid permission.");
      }

      client.commands.set(command.name, command);
      CommandsArray.push(command);

      await Table.addRow(command.name, "✅ LOADED");
    }
  );

  console.log(Table.toString());

  // For deployment
  // client.on("ready", () =>
  //   client.guilds.cache.forEach((g) =>
  //     g.commands.set(CommandsArray).catch(() => {})
  //   )
  // );

  // For development
  client.on("ready", () =>
    client.guilds
      .fetch(process.env.GUILD_ID)
      .then((g) => g.commands.set(CommandsArray).catch(() => {}))
  );
};
