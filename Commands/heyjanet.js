const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "heyjanet",
  description: "Janet replies!",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.reply("Hi There!");
  },
};
