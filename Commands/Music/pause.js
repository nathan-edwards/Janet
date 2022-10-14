const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    const Response = new EmbedBuilder();

    if (!queue) {
      Response.setTitle("🛑 There is no music playing!").setColor(colors.red);
      return interaction.reply({
        embeds: [Response],
      });
    }

    client.player.pause(interaction.guildId);

    Response.setColor(colors.default).setTitle("⏸️ Paused the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
