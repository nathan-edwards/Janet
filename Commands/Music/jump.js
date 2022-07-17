const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Jumps to a specific song in the queue")
    .addNumberOption((option) =>
      option
        .setName("index")
        .setDescription("The index of the song to jump to")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return interaction.reply("I'm currently not playing in this server.");

    if (queue.tracks.length < 1)
      return interaction.reply("There is no song in the queue.");

    const index = interaction.options.getNumber("index", true) - 1;

    if (index > queue.tracks.length || index < 0 || !queue.tracks[index])
      return interaction.reply("Provided song index does not exist.");

    track = queue.tracks[index];
    queue.jump(index);

    const Response = new MessageEmbed()
      .setColor(colors.default)
      .setDescription(
        `🔢 Jumped to: [${track.title}](${track.url}) - ${track.author} [${track.duration}]`
      );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
