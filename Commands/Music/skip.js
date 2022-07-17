const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    queue.skip();

    const Response = new MessageEmbed()
      .setColor(colors.default)
      .setDescription("⏭️ Skipped the current song!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
