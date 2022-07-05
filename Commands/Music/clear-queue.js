const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear-queue")
    .setDescription("Clears the current queue"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    queue.clear();
    await interaction.reply(
      `The queue of ${queue.tracks.length} songs have been cleared!`
    );
  },
};
