import { Command } from "../../structures/index.js";
export default class Loop extends Command {
    constructor(client) {
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
    async run(client, ctx, args) {
        const embed = client.embed().setColor(client.color.main);
        const player = client.queue.get(ctx.guild.id);
        switch (player.loop) {
            case "off":
                player.loop = "queue";
                return ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Looping the queue`)
                            .setAuthor({ name: "| 🔁 Loop ", iconURL: ctx.author.avatarURL() })
                            .setColor(client.color.main),
                    ],
                });
            case "queue":
                player.loop = "repeat";
                return ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Looping the song`)
                            .setAuthor({ name: "| 🔁 Loop ", iconURL: ctx.author.avatarURL() })
                            .setColor(client.color.main),
                    ],
                });
            case "repeat":
                player.loop = "off";
                return ctx.sendMessage({
                    embeds: [
                        embed
                            .setDescription(`Looping is now off`)
                            .setAuthor({ name: "| 🔁 Loop ", iconURL: ctx.author.avatarURL() })
                            .setColor(client.color.main),
                    ],
                });
        }
    }
}
//# sourceMappingURL=Loop.js.map