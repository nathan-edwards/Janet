const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grab")
    .setDescription("Grabs the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return interaction.reply({
        embeds: [
          {
            description: `There's nothing currently playing in the server.`,
            color: colors.red,
          },
        ],
        ephemeral: true,
      });
    }

    const Response1 = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`Sent a DM with the current song!`);

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
      .setTitle(`⏏️ Song Grabbed!`)
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
