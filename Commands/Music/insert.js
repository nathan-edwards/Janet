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
        .setDescription("The song to search for")
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
    const query = options.getString("song");
    const Response = new EmbedBuilder();

    if (!interaction.member.voice.channelId) {
      Response.setColor(colors.red).setDescription(
        `⚠️ You are not in a voice channel`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    ) {
      Response.setColor(colors.red).setDescription(
        `⚠️ You are not in my voice channel`
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    await client.player.play(interaction.member.voice.channel, query, {
      member: interaction.member,
      textChannel: interaction.channel,
      position: position,
      interaction,
    });

    if (!(await client.player.getQueue(interaction.guildId))) return;

    const queue = await client.player.getQueue(interaction.guildId);
    const track = queue.songs[position];

    Response.setColor(colors.default)
      .setTitle(`🎶 Inserted`)
      .setDescription(
        `**[${track.name}](${track.url})** by **${track.uploader.name}** at position **${position}**`
      )
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(track.thumbnail);

    reply = {
      embeds: [Response],
    };
    interaction.reply(reply);
  },
};
