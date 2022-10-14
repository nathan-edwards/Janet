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

    // const progress = queue.createProgressBar();
    // const perc = queue.getPlayerTimestamp();
    let next;
    if (!queue.songs[1]) {
      next = "There are no songs queued";
    } else {
      next = `[${queue.songs[1].name}](${queue.songs[1].url}) - ${queue.songs[1].uploader.name}`;
    }

    let repeatMode = queue.repeatMode;
    switch (repeatMode) {
      case 0:
        repeatMode = "Disabled";
        break;
      case 1:
        repeatMode = "Track";
        break;
      case 2:
        repeatMode = "Queue";
        break;
    }

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("🎵 Now Playing")
      .setDescription(
        `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].uploader.name}`
      )
      .addFields([
        // {
        //   name: "Progress:",
        //   value: progress,
        // },
        {
          name: "Requested by:",
          value: `${queue.songs[0].user}`,
        },
        {
          name: "Next Up:",
          value: `${next}`,
        },
        {
          name: "Settings:",
          value: `Volume: ${queue.volume}% | Repeat Mode: ${repeatMode}`,
        },
      ])
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(queue.songs[0].thumbnail);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
