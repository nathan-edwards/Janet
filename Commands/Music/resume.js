const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    queue.setPaused(false);

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription("▶️ Resumed the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
