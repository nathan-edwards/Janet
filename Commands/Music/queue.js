const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the current queue"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply({
        content: "No music is currently being played",
      });

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return interaction.reply({
      embeds: [
        {
          title: "Now Playing",
          description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
          fields: [
            {
              name: "\u200b",
              value: progress,
            },
          ],
          footer: {
            text: `Queued by ${queue.current.requestedBy.tag}`,
          },
        },
      ],
    });
  },
};
