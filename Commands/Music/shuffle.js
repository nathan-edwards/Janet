const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the current queue"),
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

    client.player.shuffle(interaction.guildId);

    Response.setColor(colors.default).setTitle(
      "🔀 The queue has been shuffled!"
    );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
