import { Command } from "../../structures/index.js";
export default class Resume extends Command {
    constructor(client) {
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
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.paused)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Resume ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setDescription("▶️ The player is not paused."),
                ],
            });
        player.pause();
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "Disco Janet 🎵 Resume ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                    .setDescription(`▶️ Resumed the player`),
            ],
        });
    }
}
//# sourceMappingURL=Resume.js.map