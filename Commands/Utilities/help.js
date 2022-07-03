const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help for a command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Get help for a command")
        .addChoices({
          name: "Music",
          value: "music",
        })
    ),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Help")
      .setDescription(
        "This is a list of commands that I can execute.\n\n" +
          "To get more information about a command, use `help <command>`."
      );

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
