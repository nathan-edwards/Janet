import { ApplicationCommandOptionType } from "discord.js";
import { Command, Janet, Context } from "../../structures/index.js";

export default class Quote extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "quote",
            description: {
                content: "Quotes a quote from the server",
                examples: ["quote"],
                usage: "quote",
            },
            category: "quotes",
            aliases: ["quote", "q"],
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
            .setTitle(`\n🧾 **Quote #${args[0]}**`)
            .setDescription(`**${quote.content}** - ${quote.author}`)
            .setFooter({ text: `Quoted by ${client.guilds.cache.get(ctx.guild.id).members.cache.get(quote.quoter).user.tag}`, iconURL: client.guilds.cache.get(ctx.guild.id).members.cache.get(quote.quoter).user.displayAvatarURL() })
            .setTimestamp()
        return ctx.sendMessage({ embeds: [embed] });
    }
}