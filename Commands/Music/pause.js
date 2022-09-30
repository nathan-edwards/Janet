const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply({
        content: "No music is currently being played",
      });

    client.player.pause(interaction.guildId);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("⏸️ Paused the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
