const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  type: "USER",
  context: true,
  /**
   *
   * @param {ContextMenuInteraction} interaction
   */
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);
    const Response = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${target.user.tag}'s Avatar`)
      .setImage(target.user.avatarURL({ dynamic: true, size: 512 }));
    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
