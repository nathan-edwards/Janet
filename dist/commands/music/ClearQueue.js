import { Command } from "../../structures/index.js";
export default class ClearQueue extends Command {
    constructor(client) {
        super(client, {
            name: "clearqueue",
            description: {
                content: "Clears the queue",
                examples: ["clearqueue"],
                usage: "clearqueue",
            },
            category: "music",
            aliases: ["cq"],
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
                        .setAuthor({ name: "Disco Janet ⚠️ Clear Queue ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("There are no songs in the queue."),
                ],
            });
        player.queue = [];
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "Disco Janet 🎵 Clear Queue ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                    .setDescription(`🧹 Queue has been cleared!`),
            ],
        });
    }
}
//# sourceMappingURL=ClearQueue.js.map