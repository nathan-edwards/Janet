import { Command, Janet, Context } from "../../structures/index.js";

export default class Grab extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "grab",
      description: {
        content: "Grabs the current playing song",
        examples: ["grab"],
        usage: "grab",
      },
      category: "music",
      aliases: [],
      cooldown: 3,
      args: false,
      player: {
        voice: false,
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
    const embed = client.embed().setColor(client.color.main);
    let player = client.queue.get(ctx.guild.id);
    let song = player.current;

    try {
      const dm = client
        .embed()
        .setTitle(`**${song.info.title}**`)
        .setURL(song.info.uri)
        .setThumbnail(song.info.thumbnail)
        .setDescription(
          `**Duration:** ${song.info.isStream
            ? "LIVE"
            : client.utils.formatTime(song.info.length)
          }\n**Requested by:** ${song.info.requester}\n**Link:** [Click here](${song.info.uri
          })`
        )
        .setColor(client.color.main);
      await ctx.author.send({ embeds: [dm] });
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(client.color.green)
            .setAuthor({ name: "Disco Janet 🎵 Grab ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription(`🪝 **I sent you a DM.**`)
        ],
      });
    } catch (e) {
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Grab ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription(`🪝 **I couldn't send you a DM.**`)
        ],
      });
    }
  }
}
