const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the queue and clears it"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    const Response = new EmbedBuilder();

    if (!queue?.playing) {
      Response.setColor(colors.red).setDescription(
        "⚠️ No music is currently being played"
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    Response.setColor(colors.default)
      .setDescription("🛑 Queue has been stopped and cleared!")
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp();

    const Response2 = new EmbedBuilder()
      .setColor(colors.default)
      .setDescription("👋 Disconnected.")
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp();

    if (queue) await client.player.stop(interaction.guildId);
    return interaction.reply({
      embeds: [Response, Response2],
    });
  },
};
