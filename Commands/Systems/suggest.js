const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Create a suggestion")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Select the type")
        .setRequired(true)
        .setChoices(
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
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Provide name for suggestion")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Provide description for suggestion")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;
    const type = options.getString("type");
    const name = options.getString("name");
    const desc = options.getString("description");

    const Response = new MessageEmbed()
      .setColor("#6DB966")
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
