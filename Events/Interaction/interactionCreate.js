const { Client, CommandInteraction, EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command)
        return (
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(colors.red)
                .setDescription(
                  "🛑 There was an error while executing this command!"
                ),
            ],
          }) && client.commands.delete(interaction.commandName)
        );

      if (
        command.permission &&
        !interaction.member.permissions.has(command.permission)
      ) {
        return interaction.reply({
          content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`,
          ephemeral: true,
        });
      }

      command.execute(interaction, client);
    }
  },
};
