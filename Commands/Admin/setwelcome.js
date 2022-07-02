const { CommandInteraction, MessageEmbed } = require("discord.js");
const welcomeSchema = require("../../Models/welcome-schema");

module.exports = {
  name: "setwelcome",
  description: "Set the welcome message for the server.",
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "channel",
      description: "The channel to send the welcome message in.",
      type: "channel",
      channelTypes: ["text"],
      required: true,
    },
    {
      name: "message",
      description: "The welcome message to send.",
      type: "string",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild } = interaction;
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
