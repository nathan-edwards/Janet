const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insert")
    .setDescription("Inserts a song into the queue")
    .addStringOption((option) =>
      option
        .setName("song")
        .setRequired(true)
        .setDescription("The song to insert")
    )
    .addNumberOption((option) =>
      option
        .setName("position")
        .setDescription("The position to insert the song at")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const position = options.getNumber("position");
    const song = options.getString("song");

    if (!interaction.member.voice.channelId)
      return interaction.reply({
        embeds: [
          { description: `You are not in a voice channel!`, color: colors.red },
        ],
        ephemeral: true,
      });
    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    )
      return interaction.reply({
        embeds: [
          {
            description: `You are not in my voice channel!`,
            color: colors.red,
          },
        ],
        ephemeral: true,
      });

    const queue = client.player.getQueue(interaction.guild);
    if (!queue || !song) return;

    if (slash) await interaction.deferReply();
    let query = song,
      reply = {};
    const searchResult = await client.player.search(query, {
      requestedBy: slash ? interaction.user : interaction.author,
      searchEngine: "dodong",
    });
    if (!searchResult || !searchResult.tracks.length - 1)
      reply = {
        embeds: [{ description: `No results found!`, color: colors.red }],
        ephemeral: true,
      };
    else if (searchResult.playlist)
      reply = {
        embeds: [
          {
            description: `This command does not support playlists.\nUse **${client.prefix}play** instead.`,
            color: colors.red,
          },
        ],
        ephemeral: true,
      };
    else {
      queue.insert(searchResult.tracks[0], position);

      reply = {
        embeds: [
          {
            description: `Queued **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})** at position **1**`,
            color: colors.default,
          },
        ],
      };
    }
    if (slash) interaction.editReply(reply);
    else interaction.reply(reply);
  },
};
