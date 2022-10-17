const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    const Response = new EmbedBuilder();

    if (!queue) {
      Response.setColor(colors.red).setDescription(
        "⚠️ No music is currently being played"
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    client.player.skip(interaction.guildId);

    Response.setColor(colors.default)
      .setTitle("⏭️ Skipped")
      .setDescription(
        `${queue.songs[0].name} - ${queue.songs[0].uploader.name}\n\nNow Playing:\n${queue.songs[1].name} - ${queue.songs[1].uploader.name}`
      )
      .setFooter({
        text: `${interaction.member.user.tag} `,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .setTimestamp()
      .setThumbnail(queue.songs[0].thumbnail);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
