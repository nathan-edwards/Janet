import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/index.js";
export default class Suggest extends Command {
    constructor(client) {
        super(client, {
            name: "suggest",
            description: {
                content: "Suggest a feature for the bot",
                examples: ["suggest add a new command"],
                usage: "suggest <type> <name> <description>",
            },
            category: "systems",
            aliases: ["suggestion"],
            cooldown: 3,
            args: true,
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
            options: [
                {
                    name: "type",
                    description: "The type of suggestion",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    choices: [
                        { name: "Command", value: "command" },
                        { name: "Feature", value: "feature" },
                        { name: "Bug", value: "bug" },
                    ],
                },
                {
                    name: "name",
                    description: "The name of the suggestion",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "description",
                    description: "The description of the suggestion",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }
    async run(client, ctx, args) {
        const embed = this.client.embed();
        const suggestionChannel = this.client.channels.cache.get("890345272096399400");
        if (!suggestionChannel)
            return ctx.sendMessage("The suggestion channel doesn't exist");
        const sentMessage = await ctx.sendMessage({
            embeds: [
                embed
                    .setTitle(`📝 New ${args[0]} Suggestion`)
                    .addFields([{ name: "Name", value: args[1] }, { name: "Description", value: args[2] }])
                    .setFooter({ text: `Suggested by ${ctx.author.tag}`, iconURL: ctx.author.avatarURL() })
                    .setColor(client.color.green)
            ]
        });
        await sentMessage.react("👍");
        await sentMessage.react("👎");
        await ctx.sendMessage("Suggestion sent");
    }
}
//# sourceMappingURL=Suggest.js.map