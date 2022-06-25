const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Create a suggestion",
  options: [
    {
      name: "type",
      description: "Select the type",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Command",
          value: "command",
        },
        {
          name: "System",
          value: "system",
        },
        {
          name: "Feature",
          value: "feature",
        },
        {
          name: "Event",
          value: "Event",
        },
      ],
    },
    {
      name: "name",
      description: "Provide name for suggestion",
      required: true,
      type: "STRING",
    },
    {
      name: "description",
      description: "Provide description for suggestion",
      required: true,
      type: "STRING",
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;
    const type = options.getString("type");
    const name = options.getString("name");
    const desc = options.getString("description");

    const Response = new MessageEmbed()
      .setColor("#0099ff")
      .setDescription(`${interaction.member} has suggest a ${type}.`)
      .setFooter({
        text: `${interaction.member.user.tag}`,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .addField("Name", `${name}`, true)
      .addField("Description", `${desc}`, true);
    const message = await interaction.channel.send({
      embeds: [Response],
      fetchReply: true,
    });
    message.react("✅");
    message.react("⛔");
    interaction.reply({
      content: "Your suggestion has been sent!",
      ephemeral: true,
    });
  },
};
