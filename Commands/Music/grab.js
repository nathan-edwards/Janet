const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grab")
    .setDescription("Grabs the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    const Response1 = new EmbedBuilder();

    if (!queue || !queue.playing) {
      Response.setColor(colors.red).setDescription(
        `⚠️ No music is currently being played`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    Response1.setColor(colors.default).setTitle(
      `Sent a DM with the current song!`
    );

    interaction.reply({
      embeds: [Response1],
      ephemeral: true,
    });

    if (interaction.author == undefined) {
      interaction.author = interaction.user;
    }

    const track = queue.songs[0];

    const Response2 = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`⏏️ Song Grabbed`)
      .setDescription(
        `**[${track.name}](${track.url})**\nby [${track.uploader.name}](${track.uploader.url})\n\n` +
          `${track.formattedDuration} | Queued by ${track.member}`
      )
      .setThumbnail(track.thumbnail);

    return interaction.author.send({
      embeds: [Response2],
    });
  },
};
