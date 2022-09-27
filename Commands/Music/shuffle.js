const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the current queue"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    queue.shuffle();

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setDescription("🔀 The queue has been shuffled!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
