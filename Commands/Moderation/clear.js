const { CommandInteraction, MessageEmbed } = require("discord.js");
const { execute } = require("../Developer/status");

module.exports = {
  name: "clear",
  description: "Clears a specified number of messages",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description: "The amount of messages to delete",
      required: true,
      type: "INTEGER",
    },
    {
      name: "target",
      description: "The target user",
      required: false,
      type: "USER",
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;
    const amount = options.getInteger("amount");
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
        interaction.reply({ embeds: [Response] });
      });
    }
  },
};
