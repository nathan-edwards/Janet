const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the volume of the current song")
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set the current song to")
    ),
  async execute(interaction, client) {
    const volumePercentage = interaction.options.getNumber("volume");
    const queue = client.player.getQueue(interaction.guildId);
    const Response = new EmbedBuilder();

    if (!queue?.playing) {
      Response.setColor(colors.red).setDescription(
        `⚠️ No music is currently being played`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    if (!volumePercentage) {
      Response.setColor(colors.default).setDescription(
        `🔊 The current volume is \`${queue.volume}%\``
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    if (volumePercentage < 0 || volumePercentage > 100) {
      Response.setColor(colors.red).setDescription(
        `🔊 The volume must be betweeen 1 and 100`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    client.player.setVolume(interaction.guildId, volumePercentage);

    Response.setColor(colors.default).setDescription(
      `🔊 Volume has been set to **${volumePercentage}%**`
    );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
