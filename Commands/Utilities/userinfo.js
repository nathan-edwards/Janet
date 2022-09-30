const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new ContextMenuCommandBuilder().setName("userinfo").setType(2),
  async execute(interaction) {
    const target = await interaction.guild.members.fetch(interaction.targetId);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setAuthor({
        name: `👤${target.user.tag}`,
        iconURL: target.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
      .addFields([
        { name: "ID", value: `${target.id}` },
        {
          name: "Roles",
          value: `${
            target.roles.cache
              .map((r) => r)
              .join(" ")
              .replace("@everyone", "") || "None"
          }`,
        },
        {
          name: "Member Since",
          value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
        },
        {
          name: "Account Created",
          value: `<t:${parseInt(target.user.createdAt / 1000)}:R>`,
        },
      ]);

    interaction.reply({ embeds: [Response], ephemeral: true });
  },
};
