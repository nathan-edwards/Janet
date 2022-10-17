const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the current queue"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    const Response = new EmbedBuilder();

    if (!queue) {
      Response.setColor(colors.red).setDescription(
        `⚠️ No music is currently being played`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    queue.stop(interaction.guildId);

    Response.setColor(colors.default).setTitle("🧹 Queue has been cleared!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
