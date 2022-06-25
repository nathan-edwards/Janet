const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "badasslevel",
  description: "How much of a badass are you?",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.reply(
      `You are ${Math.round(Math.random() * 101)}% badass.`
    );
  },
};
