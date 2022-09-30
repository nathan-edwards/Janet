const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The query to search for")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const query = options.getString("song");
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
    if (!query) return;

    if (
      !interaction.guild.members.me
        .permissionsIn(interaction.member.voice.channel)
        .has(client.requiredVoicePermissions)
    )
      return;

    await interaction.deferReply();

    let currentQueueLen;

    const currentQueue = await client.player.getQueue(interaction.guildId);
    if (currentQueue) {
      currentQueueLen = currentQueue.songs.length;
    }

    await client.player.play(interaction.member.voice.channel, query, {
      member: interaction.member,
      textChannel: interaction.channel,
      interaction,
    });

    const newQueue = await client.player.getQueue(interaction.guildId);
    const newQueueLen = newQueue.songs.length;
    let diff;
    let diffText;

    let track;
    if (!currentQueue && newQueue) {
      track = newQueue.songs[0];
      diff = newQueue.songs.length;
    } else if (currentQueue && newQueue) {
      diff = Math.abs(currentQueueLen - newQueueLen);
      track = newQueue.songs[currentQueueLen];
    }

    if (diff == 1) {
      diffText = ``;
    } else if (diff == 2) {
      diffText = ` + 1 track`;
    } else if (diff > 2) {
      diffText = ` + ${diff - 1} tracks`;
    }

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`🎶 Queued`)
      .setDescription(
        `**[${track.name}](${track.url})** by **${track.uploader.name}** \n${diffText}`
      )
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(track.thumbnail);

    return interaction.editReply({ embeds: [Response] });
  },
};
