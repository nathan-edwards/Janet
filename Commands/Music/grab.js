const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grab")
    .setDescription("Grabs the current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guild);
    if (!queue || !queue.playing) {
      return interaction.reply({
        embeds: [
          {
            description: `There's nothing currently playing in the server.`,
            color: colors.red,
          },
        ],
        ephemeral: true,
      });
    }

    interaction.reply({
      embeds: [
        { description: `Sent a private interaction!`, color: colors.default },
      ],
      ephemeral: true,
    });

    let playlist = "";
    if (queue.current.playlist)
      playlist = ` ┃ From: [${queue.current.playlist.title}](${queue.current.playlist.url})`;
    if (interaction.author == undefined) {
      interaction.author = interaction.user;
    }
    return interaction.author.send({
      embeds: [
        {
          description:
            `**[${queue.current.title}](${queue.current.url})**\nby ${queue.current.author}\n\n` +
            `${queue.current.duration}${playlist}`,
          thumbnail: {
            url: `${queue.current.thumbnail}`,
          },
          color: colors.default,
        },
      ],
    });
  },
};
