const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const colors = require("../../assets/json/colors.json");

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
  async execute(interaction, client, slash) {
    const { options } = interaction;
    if (!interaction.member.voice.channelId)
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.red)
            .setDescription(`You are not in a voice channel!`),
        ],
        ephemeral: true,
        failIfNotExists: false,
      });
    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.red)
            .setDescription(`You are not in my voice channel!`),
        ],
        ephemeral: true,
        failIfNotExists: false,
      });
    if (!options.getString("query")) return;

    if (
      !interaction.guild.members.me
        .permissionsIn(interaction.member.voice.channel)
        .has(client.requiredVoicePermissions)
    )
      return;

    if (slash) await interaction.deferReply();
    let query = options.getString("query");
    const searchResult = await client.player.search(query, {
      requestedBy: slash ? interaction.user : interaction.author,
      searchEngine: QueryType.AUTO,
    });

    if (!searchResult || !searchResult.tracks.length) {
      reply = {
        embeds: [
          new EmbedBuilder()
            .setColor(colors.red)
            .setDescription(`No results found!`),
        ],
        ephemeral: true,
        failIfNotExists: false,
      };
      slash ? interaction.editReply(reply) : interaction.reply(reply);
      return;
    }

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: { channel: interaction.channel },
    });

    let justConnected;

    try {
      if (!queue.connection) {
        justConnected = true;
        await queue.connect(interaction.member.voice.channel);
      }
    } catch {
      client.player.deleteQueue(interaction.guild);
      reply = {
        embeds: [
          new EmbedBuilder()
            .setColor(colors.red)
            .setDescription(`Could not join your voice channel!`),
        ],
        failIfNotExists: false,
      };
      slash ? interaction.editReply(reply) : interaction.reply(reply);
      return;
    }

    if (searchResult.playlist) {
      reply = {
        embeds: [
          new EmbedBuilder()
            .setColor(colors.default)
            .setDescription(
              `Queued **${searchResult.tracks.length}** tracks from [${searchResult.tracks[0].playlist.title}](${searchResult.tracks[0].playlist.url})`
            ),
        ],
        failIfNotExists: false,
      };
      queue.addTracks(searchResult.tracks);
    } else {
      reply = {
        embeds: [
          new EmbedBuilder()
            .setColor(colors.default)
            .setDescription(
              `Queued **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})**`
            ),
        ],
        failIfNotExists: false,
      };
      queue.addTrack(searchResult.tracks[0]);
    }
    slash ? interaction.editReply(reply) : interaction.reply(reply);

    if (justConnected) queue.play();
  },
};
