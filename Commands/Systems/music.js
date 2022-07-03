const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Complete Music System")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("play")
        .setDescription("Play a song")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Song to play")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("volume")
        .setDescription("Change the volume")
        .addNumberOption((option) =>
          option
            .setName("volume")
            .setDescription("Volume to set")
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(100)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("skip").setDescription("Skip a song")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("stop").setDescription("Stop the music")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("pause").setDescription("Pause the music")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("resume").setDescription("Resume the music")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("queue").setDescription("Show the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("np").setDescription("Show the current song")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("clear").setDescription("Clear the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("shuffle").setDescription("Shuffle the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("jump")
        .setDescription("Jump to a song")
        .addNumberOption((option) =>
          option
            .setName("index")
            .setDescription("Index of the song")
            .setRequired(true)
            .setMinValue(0)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a song")
        .addNumberOption((option) =>
          option
            .setName("index")
            .setDescription("Index of the song")
            .setRequired(true)
            .setMinValue(0)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("previous").setDescription("Play the previous song")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("autoplay").setDescription("Autoplay the queue")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("related-song").setDescription("Add related song")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("repeat-mode")
        .setDescription("Change the repeat mode")
        .addNumberOption((option) =>
          option
            .setName("mode")
            .setDescription("Mode to set")
            .setRequired(false)
            .setMinValue(0)
            .setMaxValue(2)
            .setChoices(
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
              }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("seek")
        .setDescription("Seek to a time")
        .addNumberOption((option) =>
          option
            .setName("time")
            .setDescription("Time to seek")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set-filter")
        .setDescription("Filter ontop the song")
        .addStringOption((option) =>
          option
            .setName("filter")
            .setDescription("Filter to apply")
            .setRequired(true)
            .setChoices(
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
              }
            )
        )
    ),
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
          return interaction.reply({ content: "⏹️ Music stopped!" });
        case "pause":
          client.distube.pause(VoiceChannel);
          return interaction.reply({ content: "⏸️ Music paused!" });
        case "resume":
          client.distube.resume(VoiceChannel);
          return interaction.reply({ content: "▶ Music resumed!" });
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
            content: `🔣 Song filtered! Enabled Filters: ${filters}`,
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
