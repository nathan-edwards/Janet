const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

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
    const index = options.getNumber("index");

    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    track = queue.remove(index - 1);
    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription(
        `⏏️ Removed: [${track.title}](${track.url}) - ${track.author} [${track.duration}]`
      );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
