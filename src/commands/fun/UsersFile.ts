import { Command, Janet, Context } from "../../structures/index.js";
import request from "request";

export default class File extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "file",
            description: {
                content: "Get the user's file",
                examples: ["file"],
                usage: "file",
            },
            category: "fun",
            aliases: ["file"],
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
        request(`https://api.unsplash.com/photos/random/?query=cactus&client_id=${process.env.UNSPLASH_ID}`, function (err: any, res: any, body: any) {
            if (err) return ctx.sendMessage("An error occurred");
            if (res.statusCode !== 200) return ctx.sendMessage("An error occurred");
            const data = JSON.parse(body);
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(client.color.green)
                        .setTitle(`Here is ${ctx.author.username}'s File`)
                        .setImage(data.urls.regular)
                        .setAuthor({ name: `Photo by ${data.user.name}`, url: `${data.user.links.html}` })
                        .setFooter({ text: `From Unsplash - https://unsplash.com/` })
                        .setTimestamp(),
                ],
            });
        }
        )
    }
}