import { Command } from "../../structures/index.js";
export default class Seek extends Command {
    constructor(client) {
        super(client, {
            name: "seek",
            description: {
                content: "Seeks to a certain time in the song",
                examples: ["seek 1m, seek 1h 30m"],
                usage: "seek <time>",
            },
            category: "music",
            aliases: ["s"],
            cooldown: 3,
            args: true,
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
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Seek ", iconURL: ctx.author.avatarURL() })
                        .setDescription("There are no songs in the queue."),
                ],
            });
        const time = client.utils.parseTime(args[0]);
        if (!time)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Seek ", iconURL: ctx.author.avatarURL() })
                        .setDescription("Invalid time format."),
                ],
            });
        player.seek(time);
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "| ⏩ Seek ", iconURL: ctx.author.avatarURL() })
                    .setDescription(`Seeked to ${args[0]}`),
            ],
        });
    }
}
//# sourceMappingURL=Seek.js.map