const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear-messages")
    .setDescription("Clears a specified number of messages")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The target user")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { channel, options } = interaction;
    const amount = options.getNumber("amount");
    const target = options.getUser("target");

    const Messages = await channel.messages.fetch();

    const Response = new MessageEmbed().setColor("#0099ff");

    if (target) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });
      await channel.bulkDelete(filtered, true).then((messages) => {
        Response.setDescription(
          `🧹 Deleted ${messages.size} messages from ${target.tag}`
        );
        interaction.reply({ embeds: [Response] });
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        Response.setDescription(`🧹 Deleted ${messages.size} messages`);
        interaction.reply({ embeds: [Response], ephemeral: true });
      });
    }
  },
};
