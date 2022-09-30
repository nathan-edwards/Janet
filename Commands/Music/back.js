const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("Skips the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    await queue.previous();

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("⏮️ Playing the previous song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
