const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("heyjanet")
    .setDescription("Janet replies!"),
  async execute(interaction) {
    await interaction.reply("Hi There!");
  },
};
