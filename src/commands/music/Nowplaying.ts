import { searchSong } from "../../api/Genius.js";
import { Command, Janet, Context } from "../../structures/index.js";

export default class Nowplaying extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "nowplaying",
      description: {
        content: "Shows the currently playing song",
        examples: ["nowplaying"],
        usage: "nowplaying",
      },
      category: "music",
      aliases: ["np"],
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

    const track = player.current;
    const position = player.player.position;
    const duration = track.info.length;
    const bar = client.utils.progressBar(position, duration, 20);
    const data: any = await searchSong(track.info.title);
    if (track.info.thumbnail === undefined) track.info.thumbnail = data[0].result.header_image_url;
    const embed1 = this.client
      .embed()
      .setColor(this.client.color.main)
      .setAuthor({ name: "Disco Janet 🎵 Now Playing ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
      .setThumbnail(track.info.thumbnail)
      .setDescription(
        `[${track.info.title}](${track.info.uri}) - Request By: ${track.info.requester}\n\n\`${bar}\``
      )
      .addFields({
        name: "\u200b",
        value: `\`${client.utils.formatTime(
          position
        )} / ${client.utils.formatTime(duration)}\``,
      });
    return ctx.sendMessage({ embeds: [embed1] });
  }
}
