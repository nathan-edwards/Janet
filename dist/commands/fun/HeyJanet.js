import { Command } from "../../structures/index.js";
export default class HeyJanet extends Command {
    constructor(client) {
        super(client, {
            name: "heyjanet",
            description: {
                content: "Hey Janet!",
                examples: ["heyjanet"],
                usage: "heyjanet",
            },
            category: "fun",
            aliases: ["heyj"],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
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
        const embed = this.client.embed();
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(client.color.green)
                    .setTitle("👋 Hi There!")
                    .setDescription("I'm Janet, an anthropomorphised vessel of knowledge built to make your 🫵 life easier! 👍 made by <@123314740511506432>!")
                    .setFooter({ text: `Requested by ${ctx.author.username}`, iconURL: ctx.author.avatarURL({}) })
            ],
        });
    }
}
//# sourceMappingURL=HeyJanet.js.map