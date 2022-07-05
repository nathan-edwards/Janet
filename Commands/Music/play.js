const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The query to search for")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { channel, options, member } = interaction;
    const query = options.getString("query");

    if (!member.voice.channel)
      return interaction.followUp({
        content: "Please join a voice channel first!",
      });

    await interaction.deferReply();

    const searchResult = await client.player
      .search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
      .catch(() => {});
    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({ content: "No results were found!" });

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: channel,
    });

    if (!queue.connection) await queue.connect(member.voice.channel);

    interaction.followUp({ content: `Playing ${query}` });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
