const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { RepeatMode } = require("distube");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat-mode")
    .setDescription("Toggle the repeat mode of the current queue")
    .addNumberOption((option) =>
      option
        .setName("mode")
        .setRequired(true)
        .setDescription("The repeat mode to set")
        .addChoices(
          { name: "disable", value: 0 },
          { name: "track", value: 1 },
          { name: "queue", value: 2 }
        )
    ),
  async execute(interaction, client) {
    const { options } = interaction;
    let mode = options.getNumber("mode");
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    await client.player.setRepeatMode(interaction.guildId, mode);

    const Response = new EmbedBuilder()
      .setColor(colors.default)
      .setTitle(`🔁 Repeat mode has been set to **${mode = mode ? mode == 2 ? "Queue" : "Track" : "Off"}**`);

    return interaction.reply({
      embeds: [Response],
    });
  },
};
