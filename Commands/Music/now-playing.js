const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Shows the current song playing"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();
    let next;
    if (!queue.tracks[0]) {
      next = "There are no songs queued";
    } else {
      next = `${queue.tracks[0].author} - ${queue.tracks[0].title}`;
    }
    let repeatMode;
    switch (queue.repeatMode) {
      case 0:
        repeatMode = "None";
        break;
      case 1:
        repeatMode = "Track";
        break;
      case 2:
        repeatMode = "Queue";
        break;
      case 3:
        repeatMode = "Autoplay";
        break;
    }

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .addFields([
        {
          name: "🎵 Now Playing:",
          value: `${queue.current.title} - ${queue.current.author}`,
        },
        {
          name: "Progress:",
          value: progress,
        },
        {
          name: "Requested by:",
          value: `${queue.current.requestedBy}`,
        },
        {
          name: "Next Up:",
          value: `${next}`,
        },
        {
          name: "Settings",
          value: `Volume: ${queue.volume}% | Repeat Mode: ${repeatMode}`,
        },
      ])
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(queue.current.thumbnail);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
