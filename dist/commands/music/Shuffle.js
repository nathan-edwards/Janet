import { Command } from "../../structures/index.js";
export default class Shuffle extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            description: {
                content: "Shuffles the queue",
                examples: ["shuffle"],
                usage: "shuffle",
            },
            category: "music",
            aliases: ["sh"],
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
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Shuffle ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("🔀 There are no songs in the queue."),
                ],
            });
        player.setShuffle(true);
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "Disco Janet 🎵 Shuffle ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                    .setDescription(`🔀 Shuffled the queue`),
            ],
        });
    }
}
//# sourceMappingURL=Shuffle.js.map