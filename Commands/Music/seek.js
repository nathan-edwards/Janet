const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seeks to a specific time in the current song")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("The time to seek to")
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

    queue.seek(time);

    return interaction.reply({
      content: `Seeked to ${time}`,
    });
  },
};
