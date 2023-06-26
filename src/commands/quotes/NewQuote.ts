import { ModalBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder, TextInputBuilder } from "discord.js";
import { Command, Janet, Context } from "../../structures/index.js";

export default class NewQuote extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "newquote",
            description: {
                content: "Create a new quote",
                examples: ["newquote"],
                usage: "newquote",
            },
            category: "quotes",
            aliases: ["newquote", "nq"],
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
        const modal = new ModalBuilder()
            .setCustomId("newquote")
            .setTitle("New Quote")
            .setComponents([
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId("quote")
                        .setLabel("What is the quote?")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(10)
                        .setMaxLength(1000)
                        .setRequired(true)
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId("author")
                        .setLabel("Who said it?")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(2)
                        .setMaxLength(30)
                        .setRequired(true)
                )
            ]);
        await ctx.interaction.showModal(modal);
    }
}