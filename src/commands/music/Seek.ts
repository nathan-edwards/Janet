import { Command, Janet, Context } from "../../structures/index.js";

export default class Seek extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "seek",
      description: {
        content: "Seeks to a certain time in the song",
        examples: ["seek 1m, seek 1h 30m"],
        usage: "seek <time>",
      },
      category: "music",
      aliases: ["s"],
      cooldown: 3,
      args: true,
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
    const embed = this.client.embed();
    if (!player.queue.length)
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Seek ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("⏩ There are no songs in the queue."),
        ],
      });
    const time = client.utils.parseTime(args[0]);
    if (!time)
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Seek ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("⏩ Invalid time format."),
        ],
      });
    player.seek(time);

    return ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setAuthor({ name: "Disco Janet 🎵 Seek ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
          .setDescription(`⏩ Seeked to ${args[0]}`),
      ],
    });
  }
}
