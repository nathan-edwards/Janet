const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("Skips the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    const Response = new EmbedBuilder();

    if (!queue || !queue.playing) {
      Response.setColor(colors.red).setDescription(
        `⚠️ No music is currently being played`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    await queue.previous();

    Response.setColor(colors.default).setTitle("⏮️ Playing the previous song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
