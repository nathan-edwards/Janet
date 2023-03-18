import { Command, Janet, Context } from "../../structures/index.js";

export default class Leave extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "leave",
      description: {
        content: "Leaves the voice channel",
        examples: ["leave"],
        usage: "leave",
      },
      category: "music",
      aliases: ["dc"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: true,
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
    const player = client.queue.get(ctx.guild.id);
    const embed = this.client.embed();
    if (player) {
      ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.main)
            .setAuthor({ name: "Disco Janet 🎵 Leave ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription(`🛑 Left <#${player.player.connection.channelId}>`),
        ],
      });
      player.destroy();
    } else {
      ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Leave ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription(`🛑 I'm not in a voice channel`),
        ],
      });
    }
  }
}
