import { Command, Janet, Context } from "../../structures/index.js";

export default class KillJanet extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "killjanet",
            description: {
                content: "Kills Janet",
                examples: ["killjanet"],
                usage: "killjanet",
            },
            category: "dev",
            aliases: ["kj"],
            cooldown: 3,
            args: false,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: false,
        })
    }
    public async run(client: Janet, ctx: Context, args: string[]): Promise<void> {
        const embed = this.client.embed();
        embed
            .setDescription("ATTENTION! I have been murdered 😊")
            .setImage("https://c.tenor.com/FZfzOwrrJWsAAAAC/janet-the-good-place.gif")
            .setColor(client.color.red);
        await ctx.sendMessage({ embeds: [embed] });
        process.exit(0);
    }
}