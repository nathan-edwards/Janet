import { ApplicationCommandOptionType } from "discord.js";
import { Command, Janet, Context } from "../../structures/index.js";

export default class DeleteQuote extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "deletequote",
            description: {
                content: "Deletes a quote from the server",
                examples: ["deletequote"],
                usage: "deletequote",
            },
            category: "quotes",
            aliases: ["deletequote", "dq"],
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
            options: [
                {
                    name: "id",
                    description: "The id of the quote",
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ],
        });
    }
    public async run(client: Janet, ctx: Context, args: string[]) {
        const embed = this.client.embed();
        const data = await client.prisma.guild.findMany({
            where: {
                guildId: ctx.guild.id
            },
            select: {
                quotes: true
            }
        });
        if (data[0].quotes.length === 0) return ctx.sendMessage({ content: "There are no quotes in this server" })
        const quote = data[0].quotes[parseInt(args[0]) - 1];
        if (!quote) return ctx.sendMessage({ content: "That quote doesn't exist" });
        embed
            .setColor(this.client.color.main)
            .setTitle(`\n🗑️ Deleted **Quote #${args[0]}**`)
            .setTimestamp()
        await client.prisma.guild.update({
            where: {
                guildId: ctx.guild.id
            },
            data: {
                quotes: {
                    delete: {
                        id: quote.id
                    }
                }
            }
        })
        return ctx.sendMessage({ embeds: [embed] });
    }
}