const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const generatePages = require("../../Utilities/embed-pages.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the current queue"),
  async execute(interaction, client, _fromButton = false) {
    await interaction.deferReply();
    var queue = await client.player.getQueue(interaction.guildId);
    if (!queue) {
      if (_fromButton) return;
      const embed = new EmbedBuilder();
      embed.setTitle("Server Queue");
      embed.setColor(colors.red);
      embed.setDescription(`No songs in the queue.`);
      return interaction.editReply({ embeds: [embed] });
    }

    var queue = await client.player.getQueue(interaction.guildId);
    const current = queue.songs[0];
    queue.songs.shift();
    const pages = [];
    let page = 1,
    emptypage = false,
    usedby = _fromButton ? `[${interaction.member}]\n` : "";
    do {
      const pageStart = 10 * (page - 1);
      const pageEnd = pageStart + 10;
      const songs = queue.songs.slice(pageStart, pageEnd).map((m, i) => {
        const title = ["spotify-custom", "soundcloud-custom"].includes(m.source)
          ? `${m.uploader.name} - ${m.name}`
          : `${m.name}`;
        return `**${i + pageStart + 1}**. [${m.name}](${m.url}) - ${
          m.uploader.name
        } [${m.formattedDuration}]`;
      });
      if (songs.length) {
        const embed = new EmbedBuilder();
        embed.setDescription(`🎵 **Now Playing**\n[${current.name}](${
          current.url
        }) by ${current.uploader.name} [${
          current.formattedDuration
        }]\n\n📃 **Up Next**
          ${usedby}${songs.join("\n")}${
          queue.songs.length > pageEnd
            ? `\n... ${queue.songs.length - pageEnd} more track(s)`
            : ""
        }`);
        if (page % 2 === 0) embed.setColor(colors.default);
        else embed.setColor(colors.default);
        const title = ["spotify-custom", "soundcloud-custom"].includes(
          current.source
        )
          ? `${current.uploader.name} - ${current.name}`
          : `${current.name}`;
        // if (page === 1) embed.setTitle(`Queue`);
        pages.push(embed);
        page++;
      } else {
        emptypage = true;
        if (page === 1) {
          const embed = new EmbedBuilder();
          embed.setColor(colors.default);
          embed.setDescription(`${usedby}No more songs in the queue.`);
          const title = ["spotify-custom", "soundcloud-custom"].includes(
            current.source
          )
            ? `${current.uploader.name} - ${current.name}`
            : `${current.name}`;
          embed.setAuthor({
            name: `Now playing: ${title}`,
            iconURL: null,
            url: `${current.url}`,
          });
          return _fromButton
            ? interaction.channel.send({ embeds: [embed] })
            : interaction.editReply({ embeds: [embed] });
        }
        if (page === 2) {
          return _fromButton
            ? interaction.channel.send({ embeds: [pages[0]] })
            : interaction.editReply({ embeds: [pages[0]] });
        }
      }
    } while (!emptypage);

    generatePages(interaction, pages, {
      timeout: 40000,
      fromButton: _fromButton,
    });
  },
};
