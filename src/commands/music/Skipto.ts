import { Command, Janet, Context } from "../../structures/index.js";

export default class Skipto extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "skipto",
      description: {
        content: "Skips to a specific song in the queue",
        examples: ["skipto 3"],
        usage: "skipto <number>",
      },
      category: "music",
      aliases: ["st"],
      cooldown: 3,
      args: true,
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
      options: [
        {
          name: "number",
          description: "The number of the song you want to skip to",
          type: 4,
          required: true,
        },
      ],
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
            .setAuthor({ name: "Disco Janet ⚠️ Skipto ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("🔢 There are no songs in the queue."),
        ],
      });
    if (isNaN(Number(args[0])))
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Skipto ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("🔢 Please provide a valid number."),
        ],
      });
    if (Number(args[0]) > player.queue.length)
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Skipto ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("🔢 Please provide a valid number."),
        ],
      });
    if (Number(args[0]) < 1)
      return ctx.sendMessage({
        embeds: [
          embed
            .setColor(this.client.color.red)
            .setAuthor({ name: "Disco Janet ⚠️ Skipto ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
            .setDescription("🔢 Please provide a valid number."),
        ],
      });
    player.skip(Number(args[0]));

    return ctx.sendMessage({
      embeds: [
        embed
          .setColor(this.client.color.main)
          .setAuthor({ name: "Disco Janet 🎵 Skipto ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
          .setDescription(`🔢 Skipped to song number ${args[0]}`),
      ],
    });
  }
}
