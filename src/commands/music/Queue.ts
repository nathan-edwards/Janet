import { Command, Janet, Context } from "../../structures/index.js";
import { searchSong } from "../../api/Genius.js";

export default class Queue extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "queue",
      description: {
        content: "Shows the current queue",
        examples: ["queue"],
        usage: "queue",
      },
      category: "music",
      aliases: ["q"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: false,
        active: true,
        djPerm: null,
      },
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [],
    });
  }
  public async run(client: Janet, ctx: Context, args: string[]): Promise<void> {
    const player = client.queue.get(ctx.guild.id);
    const data: any = await searchSong(player.current.info.title);
    if (player.current.info.thumbnail === undefined) player.current.info.thumbnail = data[0].result.header_image_url;
    if (player.queue.length === 0)
      return ctx.sendMessage({
        embeds: [
          this.client
            .embed()
            .setColor(this.client.color.main)
            .setAuthor({ name: "Disco Janet 🎶 Queue ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setThumbnail(player.current.info.thumbnail)
            .setDescription(
              `**Now Playing**:\n [${player.current.info.title}](${player.current.info.uri
              }) - Request By: ${player.current?.info.requester} - Duration: ${player.current.info.isStream
                ? "LIVE"
                : this.client.utils.formatTime(player.current.info.length)
              } \n\n**Coming Up**:\n No Songs Queued \n\n**Settings**:\n` + `Volume: ` + (player.volume * 100) + ` | Loop: ` + ((player.loop).charAt(0).toUpperCase() + player.loop.slice(1)) + ` | Shuffle: ` + ((player.shuffle).toString().charAt(0).toUpperCase() + player.shuffle.toString().slice(1)) + ` | Autoplay: ` + ((player.autoplay).toString().charAt(0).toUpperCase() + player.autoplay.toString().slice(1))
            ),
        ],
      });
    const queue = player.queue.map(
      (track, index) =>
        `${index + 1}. [${track.info.title}](${track.info.uri}) - Request By: ${track?.info.requester
        } - Duration: ${track.info.isStream
          ? "LIVE"
          : this.client.utils.formatTime(track.info.length)
        } `
    );
    let chunks = client.utils.chunk(queue, 10) as any;
    if (chunks.length === 0) chunks = 1;
    const pages = [];
    for (let i = 0; i < chunks.length; i++) {
      const embed = this.client
        .embed()
        .setColor(this.client.color.main)
        .setAuthor({ name: "Disco Janet 🎶 Queue ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
        .setThumbnail(player.current.info.thumbnail)
        .setDescription(`\n ** Now Playing **: \n` + `[${player.current.info.title}](${player.current.info.uri}) - Request By: ${player.current?.info.requester} - Duration: ${player.current.info.isStream ? "LIVE" : this.client.utils.formatTime(player.current.info.length)} \n\n` + ` ** Coming Up **: \n` + chunks[i].join("\n") + `\n\n ** Settings **: \n` + `Volume: ` + (player.volume * 100) + ` | Loop: ` + ((player.loop).charAt(0).toUpperCase() + player.loop.slice(1)) + ` | Shuffle: ` + ((player.shuffle).toString().charAt(0).toUpperCase() + player.shuffle.toString().slice(1)) + ` | Autoplay: ` + ((player.autoplay).toString().charAt(0).toUpperCase() + player.autoplay.toString().slice(1)))
        .setFooter({ text: `Page ${i + 1} of ${chunks.length} ` });
      pages.push(embed);
    }

    return client.utils.paginate(ctx, pages);
  }
}
