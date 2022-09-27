const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    queue.setPaused(false);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setDescription("▶️ Resumed the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
