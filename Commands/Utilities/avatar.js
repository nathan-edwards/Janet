const { EmbedBuilder } = require("discord.js");
const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new ContextMenuCommandBuilder().setName("avatar").setType(2),
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`👤 ${target.user.tag}'s Avatar`)
      .setImage(target.user.avatarURL({ dynamic: true, size: 512 }));
    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
