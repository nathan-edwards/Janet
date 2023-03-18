import { Command } from "../../structures/index.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../../config.js";
export default class About extends Command {
    constructor(client) {
        super(client, {
            name: "about",
            description: {
                content: "Shows information about the bot",
                examples: ["about"],
                usage: "about",
            },
            category: "info",
            aliases: ["ab"],
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
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setLabel("Invite Janet")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=8&scope=bot%20applications.commands`));
        const embed = this.client
            .embed()
            .setAuthor({
            name: "Janet",
            iconURL: "https://i.ibb.co/3rbkssJ/ab9c7836ea9012a7902049de95d7c3a4.webp",
        })
            .setThumbnail("https://i.ibb.co/3rbkssJ/ab9c7836ea9012a7902049de95d7c3a4.webp")
            .setColor(this.client.color.main)
            .addFields([
            {
                name: "Creator",
                value: "<@123314740511506432>",
                inline: true,
            },
            {
                name: "Repository",
                value: "[Here](https://github.com/nathan-edwards/Janet)",
                inline: true,
            },
        ]);
        return await ctx.sendMessage({
            content: "",
            embeds: [embed],
            components: [row],
        });
    }
}
//# sourceMappingURL=About.js.map