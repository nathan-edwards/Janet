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

    await interaction.deferReply();

    const queue = client.player.getQueue(interaction.guildId);

    const Response = new EmbedBuilder();

    if (!queue?.playing) {
      Response.setColor(colors.red).setDescription(
        "⚠️ No music is currently being played"
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    if (time >= queue.songs[0].duration)
      return message.editReply([
        Response.setColor(colors.red).setDescription(
          "⚠️ You can't seek to a time that is longer than the song's duration!"
        ),
      ]);

    await client.player.seek(interaction.guildId, time);

    Response.setColor(colors.default).setDescription(
      `⏩ Seeked to **${time}**`
    );

    return interaction.editReply({
      embeds: [Response],
    });
  },
};
