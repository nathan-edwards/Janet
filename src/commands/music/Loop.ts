import { Command, Janet, Context } from "../../structures/index.js";

export default class Loop extends Command {
  constructor(client: Janet) {
    super(client, {
      name: "loop",
      description: {
        content: "loop the current song or the queue",
        examples: ["loop", "loop queue", "loop song"],
        usage: "loop",
      },
      category: "general",
      aliases: ["loop"],
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
    const embed = client.embed().setColor(client.color.main);
    const player = client.queue.get(ctx.guild.id);

    switch (player.loop) {
      case "off":
        player.loop = "queue";
        return ctx.sendMessage({
          embeds: [
            embed
              .setDescription(`🔁 Looping the queue`)
              .setAuthor({ name: "Disco Janet 🎵 Loop ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
              .setColor(client.color.main),
          ],
        });
      case "queue":
        player.loop = "repeat";
        return ctx.sendMessage({
          embeds: [
            embed
              .setDescription(`🔁 Looping the song`)
              .setAuthor({ name: "Disco Janet 🎵 Loop ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
              .setColor(client.color.main),
          ],
        });
      case "repeat":
        player.loop = "off";
        return ctx.sendMessage({
          embeds: [
            embed
              .setDescription(`🔁 Looping is now off`)
              .setAuthor({ name: "Disco Janet 🎵 Loop ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
              .setColor(client.color.main),
          ],
        });
    }
  }
}