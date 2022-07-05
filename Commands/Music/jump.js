const { SlashCommandBuilder } = require("@discordjs/builders");

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
    const { options } = interaction;
    const index = options.getNumber("index");

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    track = queue.jump(index);

    return interaction.reply({
      content: `Jumped to ${track.title}`,
    });
  },
};
