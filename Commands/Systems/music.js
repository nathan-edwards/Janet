const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "music",
  description: "Complete Music System",
  options: [
    {
      name: "play",
      description: "Play a song",
      type: "SUB_COMMAND",
      options: [
        {
          name: "query",
          description: "Song to play",
          required: true,
          type: "STRING",
        },
      ],
    },
    {
      name: "volume",
      description: "Change the volume",
      type: "SUB_COMMAND",
      options: [
        {
          name: "volume",
          description: "Volume to set",
          required: true,
          type: "NUMBER",
        },
      ],
    },
    {
      name: "skip",
      description: "Skip a song",
      type: "SUB_COMMAND",
    },
    {
      name: "stop",
      description: "Stop the music",
      type: "SUB_COMMAND",
    },
    {
      name: "pause",
      description: "Pause the music",
      type: "SUB_COMMAND",
    },
    {
      name: "resume",
      description: "Resume the music",
      type: "SUB_COMMAND",
    },
    {
      name: "queue",
      description: "Show the queue",
      type: "SUB_COMMAND",
    },
    {
      name: "np",
      description: "Show the current song",
      type: "SUB_COMMAND",
    },
    {
      name: "clear",
      description: "Clear the queue",
      type: "SUB_COMMAND",
    },
    {
      name: "shuffle",
      description: "Shuffle the queue",
      type: "SUB_COMMAND",
    },
    {
      name: "jump",
      description: "Jump to a song",
      type: "SUB_COMMAND",
      options: [
        {
          name: "index",
          description: "Index of the song",
          required: true,
          type: "NUMBER",
        },
      ],
    },
    {
      name: "remove",
      description: "Remove a song",
      type: "SUB_COMMAND",
      options: [
        {
          name: "index",
          description: "Index of the song",
          required: true,
          type: "NUMBER",
        },
      ],
    },
    {
      name: "previous",
      description: "Play the previous song",
      type: "SUB_COMMAND",
    },
    {
      name: "autoplay",
      description: "Autoplay the queue",
      type: "SUB_COMMAND",
    },
    {
      name: "related-song",
      description: "Add related song",
      type: "SUB_COMMAND",
    },
    {
      name: "repeat-mode",
      description: "Change the repeat mode",
      type: "SUB_COMMAND",
      options: [
        {
          name: "mode",
          description: "Mode to set",
          required: false,
          type: "NUMBER",
          choices: [
            {
              name: "None",
              value: 0,
            },
            {
              name: "Song",
              value: 1,
            },
            {
              name: "Queue",
              value: 2,
            },
          ],
        },
      ],
    },
    {
      name: "seek",
      description: "Seek to a time",
      type: "SUB_COMMAND",
      options: [
        {
          name: "time",
          description: "Time to seek",
          required: true,
          type: "NUMBER",
        },
      ],
    },
    {
      name: "set-filter",
      description: "Filter ontop the song",
      type: "SUB_COMMAND",
      options: [
        {
          name: "filter",
          description: "Filter to apply",
          required: true,
          type: "STRING",
          choices: [
            {
              name: "None",
              value: "none",
            },
            {
              name: "3D",
              value: "3d",
            },
            {
              name: "Bass Boost",
              value: "bassboost",
            },
            {
              name: "Echo",
              value: "echo",
            },
            {
              name: "Karaoke",
              value: "karaoke",
            },
            {
              name: "Nightcore",
              value: "nightcore",
            },
            {
              name: "Vaporwave",
              value: "vaporwave",
            },
            {
              name: "Gate",
              value: "gate",
            },
            {
              name: "Haas",
              value: "haas",
            },
            {
              name: "Reverse",
              value: "reverse",
            },
            {
              name: "Surround",
              value: "surround",
            },
            {
              name: "Mcompand",
              value: "mcompand",
            },
            {
              name: "Phaser",
              value: "phaser",
            },
            {
              name: "Tremolo",
              value: "tremolo",
            },
            {
              name: "Earwax",
              value: "earwax",
            },
          ],
        },
      ],
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, member, guild, channel } = interaction;
    const VoiceChannel = member.voice.channel;

    if (!VoiceChannel)
      return interaction.reply({
        content: "You must be in a voice channel to use this command!",
      });

    if (
      guild.me.voice.channelId &&
      VoiceChannel.id !== guild.me.voice.channelId
    )
      return interaction.reply({ content: "I am already in a voice channel!" });

    try {
      switch (options.getSubcommand()) {
        case "play":
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
          });
          return interaction.reply({ content: "🎵 Request receieved!" });
        case "playSkip":
          client.distube.play(VoiceChannel, options.getString("query"), {
            textChannel: channel,
            member: member,
            skip: true,
          });
          return interaction.reply({ content: "🎵 Request received!" });
        case "volume":
          const Volume = options.getNumber("volume");
          if (Volume > 100 || Volume < 1)
            return interaction.reply({
              content: "Volume must be between 1 and 100!",
            });

          client.distube.setVolume(VoiceChannel, Volume);
          return interaction.reply({
            content: "🎚️ Volume set to " + Volume + "%!",
          });
        case "skip":
          client.distube.skip(VoiceChannel);
          return interaction.reply({ content: "⏭️ Song skipped!" });
        case "stop":
          client.distube.stop(VoiceChannel);
          return interaction.reply({ content: "🛑 Music stopped!" });
        case "pause":
          client.distube.pause(VoiceChannel);
          return interaction.reply({ content: "⏸️ Music paused!" });
        case "resume":
          client.distube.resume(VoiceChannel);
          return interaction.reply({ content: "▶️ Music resumed!" });
        case "queue":
          const Queue = await client.distube.getQueue(VoiceChannel);
          if (Queue.length === 0) {
            return interaction.reply({
              content: "There is no song in the queue!",
            });
          }
          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("PURPLE")
                .setTitle("Queue")
                .setDescription(
                  `${Queue.songs.map(
                    (song, index) =>
                      `\n**${index + 1}**. ${song.name} - \`${
                        song.formattedDuration
                      }\``
                  )}`
                ),
            ],
          });
        case "np":
          const NowPlaying = await client.distube.getQueue(VoiceChannel);
          if (!NowPlaying) {
            return interaction.reply({
              content: "There is no song playing!",
            });
          }

          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Now Playing")
                .setDescription(`${NowPlaying.songs[0].name}`),
            ],
          });
        case "clear":
          const Clear = await client.distube.getQueue(VoiceChannel);
          if (Clear.songs.length === 0)
            return interaction.reply({
              content: "There is no song in the queue!",
            });
          await Clear.songs.forEach((song) => {
            if (Clear.songs.length === 1) {
              client.distube.seek(VoiceChannel, song.duration);
            } else {
              client.distube.skip(VoiceChannel);
            }
          });
          return interaction.reply({ content: "🗑️ Queue cleared!" });
        case "shuffle":
          client.distube.shuffle(VoiceChannel);
          return interaction.reply({ content: "🔀 Queue shuffled!" });
        case "jump":
          client.distube.jump(VoiceChannel, options.getNumber("index"));
          return interaction.reply({ content: "🔢 Song jumped!" });
        case "previous":
          client.distube.previous(VoiceChannel);
          return interaction.reply({ content: "⏮️ Previous song!" });
        case "autoplay":
          let Mode = client.distube.toggleAutoplay(VoiceChannel);
          return interaction.reply({
            content: `🔈 Autoplay is now ${Mode ? "On" : "Off"}!`,
          });
        case "related-song":
          client.distube.addRelatedSong(VoiceChannel);
          return interaction.reply({ content: "🎶 Related song added!" });
        case "repeat-mode":
          if (options.getNumber("mode") !== null) {
            let RepeatMode = client.distube.setRepeatMode(
              VoiceChannel,
              options.getNumber("mode")
            );
            return interaction.reply({
              content: `🔁 Repeat mode set to ${(RepeatMode = RepeatMode
                ? RepeatMode == 2
                  ? "Queue"
                  : "Song"
                : "Off")}!`,
            });
          } else {
            let RepeatMode = client.distube.setRepeatMode(VoiceChannel);
            return interaction.reply({
              content: `🔁 Repeat mode is now ${(RepeatMode = RepeatMode
                ? RepeatMode == 2
                  ? "Queue"
                  : "Song"
                : "Off")}!`,
            });
          }
        case "seek":
          client.distube.seek(VoiceChannel, options.getNumber("seek"));
          return interaction.reply({ content: "🔢 Song seeked!" });
        case "set-filter":
          if (options.getString("filter") === "none") {
            client.distube.setFilter(VoiceChannel, false);
            return interaction.reply({ content: "🔇 Filter disabled!" });
          }
          let filters = client.distube.setFilter(
            VoiceChannel,
            options.getString("filter")
          );
          return interaction.reply({
            content: `🔢 Song filtered! Enabled Filters: ${filters}`,
          });
        default:
          return interaction.reply({
            content: "Invalid subcommand!",
          });
      }
    } catch (e) {
      const errorEmbed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Error: ${e}`);
      return interaction.reply({ embed: errorEmbed });
    }
  },
};
