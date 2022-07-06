const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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
    const volumePercentage = interaction.options.getNumber("volume");
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

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription(`🔊 Volume has been set to ${volumePercentage}%!`);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
