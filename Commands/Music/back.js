const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("Skips the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    await queue.back();

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription("⏮️ Playing the previous song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
