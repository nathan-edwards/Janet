const { SlashCommandBuilder } = require("@discordjs/builders");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("heyjanet")
    .setDescription("Janet replies!"),
  async execute(interaction) {
    await interaction.reply("Hi There!");
  },
};
