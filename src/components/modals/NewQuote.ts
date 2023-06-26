import { ModalSubmitInteraction } from "discord.js";
import { Component, Janet } from "../../structures/index.js";

export default class NewQuote extends Component {
    constructor(client: Janet) {
        super(client, {
            name: "newquote",
            one: true,
        });
    }

    public async run(client: Janet, interaction: ModalSubmitInteraction) {
        const embed = this.client.embed();
        embed.setTitle("✒️ Created a new quote!")
            .setDescription(`"${interaction.fields.getTextInputValue("quote")}" - ${interaction.fields.getTextInputValue("author")}`)
        const data = await client.prisma.guild.findUnique({
            where: {
                guildId: interaction.guildId,
            },
        });
        if (!data) {
            await client.prisma.guild.create({
                data: {
                    guildId: interaction.guildId,
                    quotes: {
                        create: {
                            content: interaction.fields.getTextInputValue("quote"),
                            author: interaction.fields.getTextInputValue("author"),
                            quoter: interaction.user.id,
                            date: new Date(),
                        }
                    }
                }
            })
        } else {
            await client.prisma.guild.update({
                where: {
                    guildId: interaction.guildId,
                },
                data: {
                    quotes: {
                        create: {
                            content: interaction.fields.getTextInputValue("quote"),
                            author: interaction.fields.getTextInputValue("author"),
                            quoter: interaction.user.id,
                            date: new Date(),
                        }
                    }
                }
            });
        }
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
}