import { Command, Janet, Context } from "../../structures/index.js";

export default class Resume extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "resume",
      description: {
        content: "Resumes the current song",
        examples: ["resume"],
        usage: "resume",
      },
      category: "music",
      aliases: ["r"],
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
    const embed = this.client.embed();
    if (!player.paused)
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "| ⚠️ Resume ", iconURL: ctx.author.avatarURL() })
            .setDescription("▶️ The player is not paused."),
        ],
      });
    player.pause();

    return ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setAuthor({ name: "| 🎵 Resume ", iconURL: ctx.author.avatarURL() })
          .setDescription(`▶️ Resumed the player`),
      ],
    });
  }
}
