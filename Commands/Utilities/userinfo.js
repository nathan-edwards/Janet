const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("userinfo")
    .setType(2),
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);

    const Response = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor({
        name: target.user.tag,
        iconURL: target.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
      .addField("ID", `${target.id}`)
      .addField(
        "Roles",
        `${
          target.roles.cache
            .map((r) => r)
            .join(" ")
            .replace("@everyone", "") || "None"
        }`
      )
      .addField(
        "Member Since",
        `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
        true
      )
      .addField(
        "Account Created",
        `<t:${parseInt(target.user.createdAt / 1000)}:R>`,
        true
      );

    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
