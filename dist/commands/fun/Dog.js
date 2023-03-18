import { Command } from "../../structures/index.js";
import request from "request";
export default class Dog extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            description: {
                content: "Get a random dog image",
                examples: ["dog"],
                usage: "dog",
            },
            category: "fun",
            aliases: ["puppy"],
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
        request("https://dog.ceo/api/breeds/image/random", function (err, res, body) {
            if (err)
                return ctx.sendMessage("An error occurred");
            if (res.statusCode !== 200)
                return ctx.sendMessage("An error occurred");
            const data = JSON.parse(body);
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(client.color.green)
                        .setTitle("🐶 Dog")
                        .setImage(data.message)
                        .setFooter({ text: `Requested by ${ctx.author.username}`, iconURL: ctx.author.avatarURL({}) })
                        .setTimestamp(),
                ],
            });
        });
    }
}
//# sourceMappingURL=Dog.js.map