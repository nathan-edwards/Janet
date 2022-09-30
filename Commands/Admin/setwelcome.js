const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
const welcomeSchema = require("../../Models/welcome-schema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("Set the welcome message for the server.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the welcome message in.")
        .setRequired(true)
        .addChannelTypes(0)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The welcome message to send.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, guild } = interaction;
    const message = options.getString("message");
    const target = message
      ? message.mentions.channels.first()
      : options.getChannel("channel");

    if (!guild) {
      interaction.reply("You must be in a server to use this command.");
    }

    if (!target || target.type !== "GUILD_TEXT") {
      interaction.reply("Please tag a text channel.");
    }

    let text = interaction?.options.getString("message");

    await welcomeSchema.findOneAndUpdate(
      { _id: guild.id },
      { _id: guild.id, channel: target.id, message: text },
      { upsert: true }
    );

    interaction.reply("Welcome message set.");
  },
};
