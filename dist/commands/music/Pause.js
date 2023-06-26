import { Command } from "../../structures/index.js";
export default class Pause extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            description: {
                content: "Pauses the current song",
                examples: ["pause"],
                usage: "pause",
            },
            category: "music",
            aliases: [],
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
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.paused) {
            player.pause();
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.main)
                        .setAuthor({ name: "| 🎵 Pause ", iconURL: ctx.author.avatarURL() })
                        .setDescription(`⏸️ Paused the song`),
                ],
            });
        }
        else {
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Pause ", iconURL: ctx.author.avatarURL() })
                        .setDescription(`⏸️ The song is already paused`),
                ],
            });
        }
    }
}
//# sourceMappingURL=Pause.js.map