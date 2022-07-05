const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes a song from the queue")
    .addNumberOption((option) =>
      option
        .setName("index")
        .setDescription("The index of the song to remove")
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

    track = queue.remove(index);

    return intereaction.reply({
      content: `Removed ${track.title} from the queue`,
    });
  },
};
