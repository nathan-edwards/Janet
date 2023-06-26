import { Command, Janet, Context } from "../../structures/index.js";

export default class HeyJanet extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "highfive",
            description: {
                content: "Hey Janet, High Five Please!",
                examples: ["highfive"],
                usage: "highfive",
            },
            category: "fun",
            aliases: ["highfive", "hf"],
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
    public async run(client: Janet, ctx: Context, args: string[]) {
        const embed = this.client.embed();
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(client.color.green)
                    .setImage("https://media.tenor.com/EvA9kafRz1kAAAAC/high-five-the-good-place.gif")
            ],
        });
    }
}