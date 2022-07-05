const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to a specific song in the queue")
    .addNumberOption((option) =>
      option
        .setName("index")
        .setDescription("The index of the song to skip to")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const index = options.getString("index");

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    track = queue.skipTo(index);

    return interaction.reply({
      content: `Skipped to ${track.title}`,
    });
  },
};
