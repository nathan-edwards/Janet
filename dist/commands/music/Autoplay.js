import { Command } from "../../structures/index.js";
export default class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: "autoplay",
            description: {
                content: "Toggles autoplay",
                examples: ["autoplay"],
                usage: "autoplay",
            },
            category: "music",
            aliases: ["ap"],
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
        const autoplay = player.autoplay;
        if (!autoplay) {
            embed
                .setColor(client.color.main)
                .setAuthor({ name: `| 📻 Autoplay `, iconURL: ctx.author.avatarURL() })
                .setDescription(`Autoplay has been enabled`);
            player.setAutoplay(true);
        }
        else {
            embed
                .setColor(client.color.main)
                .setAuthor({ name: `| 📻 Autoplay `, iconURL: ctx.author.avatarURL() })
                .setDescription(`Autoplay has been disabled`);
            player.setAutoplay(false);
        }
        ctx.sendMessage({ embeds: [embed] });
    }
}
//# sourceMappingURL=Autoplay.js.map