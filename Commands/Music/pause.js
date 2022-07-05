const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    
    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    queue.pause();

    return interaction.reply({
      content: "Paused the current song",
    });
  },
};
