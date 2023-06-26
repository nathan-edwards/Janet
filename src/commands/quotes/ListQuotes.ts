import { Command, Janet, Context } from "../../structures/index.js";

export default class ListQuotes extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "listquotes",
            description: {
                content: "List all quotes",
                examples: ["listquotes"],
                usage: "listquotes",
            },
            category: "quotes",
            aliases: ["listquotes", "lq"],
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

    public async run(client: Janet, ctx: Context) {
        const data = await client.prisma.guild.findMany({
            where: {
                guildId: ctx.guild.id
            },
            select: {
                quotes: true
            }
        });
        if (data[0].quotes.length === 0) return ctx.sendMessage({ content: "There are no quotes in this server" })
        const quotes = data[0].quotes.map((quote, index) => {
            return `**${index + 1}.** ${quote.content} - ${quote.author}`
        });
        let chunks = client.utils.chunk(quotes, 10) as any;
        if (chunks.length === 0) chunks = 1;
        const pages = [];
        for (let i = 0; i < chunks.length; i++) {
            const embed = this.client
                .embed()
                .setColor(this.client.color.main)
                .setTitle("🧾 **List of Quotes**")
                .setDescription(chunks[i].join("\n") + `\n\n **Use \`/quote <id>\` to get a quote**`)
                .setFooter({ text: `Page ${i + 1} of ${chunks.length}` })
                .setTimestamp()
            pages.push(embed);
        }

        return client.utils.paginate(ctx, pages);
    }
}