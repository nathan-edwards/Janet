const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the volume of the current song")
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("The volume to set the current song to")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const volumePercentage = interaction.options.getInteger("percentage");
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    if (!volumePercentage)
      return interaction.reply({
        content: `The current volume is \`${queue.volume}%\``,
      });

    if (volumePercentage < 0 || volumePercentage > 100)
      return interaction.reply({
        content: "The volume must be betweeen 1 and 100",
      });

    queue.setVolume(volumePercentage);

    return interaction.reply({
      content: `Volume has been set to \`${volumePercentage}%\``,
    });
  },
};
