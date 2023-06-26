import { Command, Janet, Context } from "../../structures/index.js";
import { ApplicationCommandOptionType, GuildMember } from "discord.js";

export default class emit extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "emit",
            description: {
                content: "Emit a event",
                examples: ["emit messageCreate"],
                usage: "emit",
            },
            category: "dev",
            aliases: ["e"],
            cooldown: 3,
            args: true,
            player: {
                voice: false,
                dj: false,
                active: false,
                djPerm: null,
            },
            permissions: {
                dev: true,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: ["Administrator"],
            },
            slashCommand: false,
            options: [
                {
                    name: "event",
                    description: "The event you want to emit",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }
    public async run(client: Janet, ctx: Context, args: string[]): Promise<void> {
        const embed = this.client.embed();
        let event: string | any;
        if (ctx.isInteraction) {
            event = ctx.interaction.options.data[0].value;
        } else {
            event = args[0];
        }

        if (!event) {
            embed
                .setDescription("Please provide a valid event")
                .setColor(client.color.red);
            return ctx.sendMessage({ embeds: [embed] });
        }

        switch (event) {
            case "guildMemberAdd": {
                this.client.emit('guildMemberAdd', ctx.member as GuildMember);
                return ctx.sendMessage({ content: "Emitted guildMemberAdd" });
            }
            case "guildMemberRemove": {
                this.client.emit('guildMemberRemove', ctx.member as GuildMember);
                return ctx.sendMessage({ content: "Emitted guildMemberRemove" });
            }
        }
    }
}