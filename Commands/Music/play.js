const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

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
          { description: `You are not in a voice channel!`, color: 0xb84e44 },
        ],
        ephemeral: true,
        failIfNotExists: false,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return interaction.reply({
        embeds: [
          { description: `You are not in my voice channel!`, color: 0xb84e44 },
        ],
        ephemeral: true,
        failIfNotExists: false,
      });
    if (!options.getString("query")) return;

    if (
      !interaction.guild.me
        .permissionsIn(interaction.member.voice.channel)
        .has(client.requiredVoicePermissions)
    )
      return;

    if (slash) await interaction.deferReply();
    let query = options.getString("query");
    reply = {};
    const searchResult = await client.player.search(query, {
      requestedBy: slash ? interaction.user : interaction.author,
      searchEngine: QueryType.AUTO,
    });
    if (!searchResult || !searchResult.tracks.length) {
      reply = {
        embeds: [{ description: `No results found!`, color: 0xb84e44 }],
        ephemeral: true,
        failIfNotExists: false,
      };
      slash ? interaction.editReply(reply) : interaction.reply(reply);
      return;
    }
    const queue = await client.player.createQueue(interaction.guild, {
      metadata: { channel: interaction.channel },

      bufferingTimeout: 1000,
      disableVolume: false, // disabling volume controls can improve performance
      leaveOnEnd: true,
      leaveOnStop: true,
      spotifyBridge: true,
      //leaveOnEmpty: true, // not working for now, discord-player issue
      //leaveOnEmptyCooldown: 300000,
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
          {
            description: `Could not join your voice channel!`,
            color: 0xb84e44,
          },
        ],
        failIfNotExists: false,
      };
      slash ? interaction.editReply(reply) : interaction.reply(reply);
      return;
    }

    if (searchResult.playlist) {
      reply = {
        embeds: [
          {
            description: `Queued **${searchResult.tracks.length}** tracks from [${searchResult.tracks[0].playlist.title}](${searchResult.tracks[0].playlist.url})`,
            color: 0x6db966,
          },
        ],
        failIfNotExists: false,
      };
      queue.addTracks(searchResult.tracks);
    } else {
      reply = {
        embeds: [
          {
            description: `Queued **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})**`,
            color: 0x6db966,
          },
        ],
        failIfNotExists: false,
      };
      queue.addTrack(searchResult.tracks[0]);
    }
    slash ? interaction.editReply(reply) : interaction.reply(reply);

    if (justConnected) queue.play();
  },
};
