const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the current queue"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There are no songs in the queue");

    queue.clear();

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription("🧹 Queue has been cleared!");

    return interaction.reply({
      embeds: [Response],
    });
  },
};
