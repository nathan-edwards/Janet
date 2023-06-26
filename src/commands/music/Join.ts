import { Command, Janet, Context } from "../../structures/index.js";

export default class Join extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "join",
      description: {
        content: "Joins the voice channel",
        examples: ["join"],
        usage: "join",
      },
      category: "music",
      aliases: ["j"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: false,
        active: false,
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
    let player = client.queue.get(ctx.guild.id) as any;
    const embed = this.client.embed();
    if (!player) {
      const vc = ctx.member as any;
      player = await client.queue.create(
        ctx.guild,
        vc.voice.channel,
        ctx.channel,
        client.shoukaku.getNode()
      );
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.main)
            .setAuthor({ name: "| 🔗 Join ", iconURL: ctx.author.avatarURL() })
            .setDescription(`Joined <#${player.player.connection.channelId}>`),
        ],
      });
    } else {
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.main)
            .setAuthor({ name: "| 🔗 Join", iconURL: ctx.author.avatarURL()})
            .setDescription(`I'm already connected to <#${player.player.connection.channelId}>`),
        ],
      });
    }
  }
}
