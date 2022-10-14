const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Jumps to a specific song in the queue")
    .addNumberOption((option) =>
      option
        .setName("position")
        .setDescription("The queue position of the song to jump to")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    const index = interaction.options.getNumber("position");

    if (!queue || !queue.playing)
      return interaction.reply("I'm currently not playing in this server.");

    if (queue.songs.length < 1)
      return interaction.reply("There is no song in the queue.");

    if (index > queue.songs.length || index < 0 || !queue.songs[index])
      return interaction.reply("Provided song index does not exist.");

    track = queue.songs[index];
    queue.jump(index);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`🔢 Jumped To Position ${index + 1}`)
      .setDescription(
        `**[${track.name}](${track.url})** by **${track.uploader.name}**`
      )
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(track.thumbnail);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
