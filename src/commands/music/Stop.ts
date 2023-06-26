import { Command, Janet, Context } from "../../structures/index.js";

export default class Stop extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "stop",
      description: {
        content: "Stops the music and clears the queue",
        examples: ["stop"],
        usage: "stop",
      },
      category: "music",
      aliases: ["st"],
      cooldown: 3,
      args: false,
      player: {
        voice: true,
        dj: true,
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

    player.queue = [];
    player.stop();

    return ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setAuthor({ name: "| ⏹️ Stop ", iconURL: ctx.author.avatarURL()})
          .setDescription(`Stopped the music and cleared the queue`),
      ],
    });
  }
}
