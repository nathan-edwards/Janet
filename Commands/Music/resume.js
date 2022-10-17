const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    const Response = new EmbedBuilder();

    if (!queue) {
      Response.setColor(colors.red).setDescription(
        "⚠️ No music is currently being played"
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    client.player.resume(interaction.guildId);

    Response.setColor(colors.default).setDescription(
      "▶️ Resumed the current song!"
    );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
