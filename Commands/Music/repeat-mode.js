const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat-mode")
    .setDescription("Sets the repeat mode of the current queue")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setRequired(true)
        .setDescription("The repeat mode to set")
        .addChoices(
          { name: "off", value: "OFF" },
          { name: "track", value: "TRACK" },
          { name: "queue", value: "QUEUE" },
          { name: "autoplay", value: "AUTOPLAY" }
        )
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    const mode = options.getString("mode");
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    switch (mode) {
      case "OFF":
        queue.setRepeatMode(QueueRepeatMode.OFF);
      case "TRACK":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
      case "QUEUE":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
      case "AUTOPLAY":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
    }

    const Response = new MessageEmbed()
      .setColor("#6DB966")
      .setDescription(` Repeat mode has been set to ${mode}`);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
