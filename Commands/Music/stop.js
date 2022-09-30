const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the queue and clears it"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("🛑 Queue has been stopped and cleared!");

    const Response2 = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("👋 Disconnected.");

    if (queue) await client.player.stop(interaction.guildId);
    return interaction.reply({
      embeds: [Response, Response2],
    });
  },
};
