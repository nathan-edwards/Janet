const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

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

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle("📝 New Suggestion")
      .setDescription(`${interaction.member} has suggested a ${type}.`)
      .setFooter({
        text: `${interaction.member.user.tag}`,
        iconURL: `${interaction.member.user.avatarURL()}`,
      })
      .addFields([
        { name: "Name", value: `${name}` },
        { name: "Description", value: `${desc}` },
      ]);
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
