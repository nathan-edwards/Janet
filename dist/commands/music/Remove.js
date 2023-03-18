import { Command } from "../../structures/index.js";
export default class Remove extends Command {
    constructor(client) {
        super(client, {
            name: "remove",
            description: {
                content: "Removes a song from the queue",
                examples: ["remove 1"],
                usage: "remove <song number>",
            },
            category: "music",
            aliases: ["rm"],
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
                    name: "song",
                    description: "The song number",
                    type: 4,
                    required: true,
                },
            ],
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
                        .setAuthor({ name: "Disco Janet ⚠️ Remove ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("⏏️ There are no songs in the queue."),
                ],
            });
        if (isNaN(Number(args[0])))
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Remove ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("⏏️ That is not a valid number."),
                ],
            });
        if (Number(args[0]) > player.queue.length)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Remove ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("⏏️ That is not a valid number."),
                ],
            });
        if (Number(args[0]) < 1)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Remove ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("⏏️ That is not a valid number."),
                ],
            });
        player.remove(Number(args[0]) - 1);
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "Disco Janet 🎵 Remove ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                    .setDescription(`⏏️ Removed song number ${Number(args[0])} from the queue`),
            ],
        });
    }
}
//# sourceMappingURL=Remove.js.map