const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seeks to a specific time (in seconds) in the current song")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("The time to seek to (in seconds)")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const time = options.getNumber("time");

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    if (!queue || !queue.playing || !time) return;
    if (time * 1000 >= queue.current.durationMS) return message.react("❌");
    await queue.seek(time * 1000);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setDescription(`⏩ Seeked to ${time}`);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
