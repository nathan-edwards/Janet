const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get help for a command",
  options: [
    {
      name: "command",
      description: "Get help for a command",
      type: "STRING",
      choices: [
        {
          name: "Music",
          value: "music",
        },
      ],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
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
