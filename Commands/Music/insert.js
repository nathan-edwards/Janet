const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insert")
    .setDescription("Inserts a song into the queue")
    .addNumberOption((option) =>
      option
        .setName("position")
        .setDescription("The position to insert the song at")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const position = options.getNumber("position");

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    track = queue.insert(position);

    return interaction.reply({
      content: `Inserted ${track.title} at position ${position}`,
    });
  },
};
