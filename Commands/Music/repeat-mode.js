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
    const Response = new EmbedBuilder();

    if (!queue?.playing) {
      Response.setColor(colors.red).setDescription(
        "⚠️ No music is currently being played"
      );
      return interaction.reply({
        embeds: [Response],
      });
    }

    await client.player.setRepeatMode(interaction.guildId, mode);

    Response.setColor(colors.default).setDescription(
      `🔁 Repeat mode has been set to **${(mode = mode
        ? mode == 2
          ? "Queue"
          : "Track"
        : "Off")}**`
    );

    return interaction.reply({
      embeds: [Response],
    });
  },
};
