const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const generatePages = require("../../Utilities/embed-pages.js");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the current queue"),
  async execute(message, client, _fromButton = false) {
    const queue = client.player.getQueue(message.guild);
    if (!queue || !queue.current) {
      if (_fromButton) return;
      const embed = new EmbedBuilder();
      embed.setTitle("Server Queue");
      embed.setColor(colors.red);
      embed.setDescription(`No songs in the queue.`);
      return message.reply({ embeds: [embed] });
    }

    const pages = [];
    let page = 1,
      emptypage = false,
      usedby = _fromButton ? `[${message.member}]\n` : "";
    do {
      const pageStart = 10 * (page - 1);
      const pageEnd = pageStart + 10;
      const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
        const title = ["spotify-custom", "soundcloud-custom"].includes(m.source)
          ? `${m.author} - ${m.title}`
          : `${m.title}`;
        return `**${i + pageStart + 1}**. [${title}](${m.url}) - ${m.author} [${
          m.duration
        }]`;
      });
      if (tracks.length) {
        const embed = new EmbedBuilder();
        embed.setDescription(`🎵 **Now Playing**\n[${queue.current.title}](${
          queue.current.url
        }) by ${queue.current.author} [${
          queue.current.duration
        }]\n\n📃 **Up Next**
          ${usedby}${tracks.join("\n")}${
          queue.tracks.length > pageEnd
            ? `\n... ${queue.tracks.length - pageEnd} more track(s)`
            : ""
        }`);
        if (page % 2 === 0) embed.setColor(colors.default);
        else embed.setColor(colors.default);
        const title = ["spotify-custom", "soundcloud-custom"].includes(
          queue.current.source
        )
          ? `${queue.current.author} - ${queue.current.title}`
          : `${queue.current.title}`;
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
            queue.current.source
          )
            ? `${queue.current.author} - ${queue.current.title}`
            : `${queue.current.title}`;
          embed.setAuthor({
            name: `Now playing: ${title}`,
            iconURL: null,
            url: `${queue.current.url}`,
          });
          return _fromButton
            ? message.channel.send({ embeds: [embed] })
            : message.reply({ embeds: [embed] });
        }
        if (page === 2) {
          return _fromButton
            ? message.channel.send({ embeds: [pages[0]] })
            : message.reply({ embeds: [pages[0]] });
        }
      }
    } while (!emptypage);

    generatePages(message, pages, { timeout: 40000, fromButton: _fromButton });
  },
};
