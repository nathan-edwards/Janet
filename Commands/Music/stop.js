const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the queue and clears it"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription("🛑 Queue has been stopped and cleared!");

    const Response2 = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription("👋 Disconnected.");

    if (queue) await queue.destroy(true);
    interaction.guild.me.voice.disconnect();
    return interaction.reply({
      embeds: [Response, Response2],
    });
  },
};
