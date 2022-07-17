const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    queue.setPaused(true);

    const Response = new MessageEmbed()
      .setColor(colors.default)
      .setDescription("⏸️ Paused the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
