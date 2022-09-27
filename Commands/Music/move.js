const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription("Inserts a song into the queue")
    .addNumberOption((option) =>
      option
        .setName("song")
        .setRequired(true)
        .setDescription("The index of the song to move")
    )
    .addNumberOption((option) =>
      option
        .setName("position")
        .setDescription("The position to insert the song at")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const song = options.getNumber("song");
    const position = options.getNumber("position");

    const queue = client.player.getQueue(interaction.guild);
    if (!queue || !song || !position) return;
    const trackIndex = song - 1;
    if (!queue.tracks[trackIndex]) return;
    const trackName = queue.tracks[trackIndex].title;
    const trackUrl = queue.tracks[trackIndex].url;
    const track = queue.remove(trackIndex);
    queue.insert(track, position - 1);
    interaction.reply({
      embeds: [
        {
          description: `Moved [${trackName}](${trackUrl}) to position **${position}**`,
          color: colors.default,
        },
      ],
    });
  },
};
