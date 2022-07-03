const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("avatar")
    .setType(2),
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    const Response = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${target.user.tag}'s Avatar`)
      .setImage(target.user.avatarURL({ dynamic: true, size: 512 }));
    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
