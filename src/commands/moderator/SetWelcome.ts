import { Command, Janet, Context } from "../../structures/index.js";
import { ApplicationCommandOptionType, ChannelType, TextChannel } from "discord.js";

export default class SetWelcome extends Command {
    constructor(client: Janet) {
        super(client, {
            name: "setwelcome",
            description: {
                content: "Set the welcome channel.",
                examples: ["#welcome", "welcome"],
                usage: "[channel]",
            },
            category: "moderator",
            aliases: ["setwel"],
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
                client: ["SendMessages", "ViewChannel", "EmbedLinks", "ManageGuild"],
                user: ["ManageGuild"],
            },
            slashCommand: false,
            options: [
                {
                    name: "channel",
                    description: "The channel you want to set",
                    type: ApplicationCommandOptionType.Channel,
                    required: true,
                },
            ],
        });
    }
    public async run(client: Janet, ctx: Context, args: string[]): Promise<void> {
        const embed = this.client.embed();
        let channel: TextChannel | any;
        if (ctx.isInteraction) {
            channel = ctx.interaction.options.data[0].value;
        } else {
            channel =
                ctx.message.mentions.channels.first() ||
                ctx.message.guild.channels.cache.get(args[0]);
        }

        if (!channel) {
            embed
                .setDescription("Please provide a valid channel")
                .setColor(client.color.red);
            return ctx.sendMessage({ embeds: [embed] });
        }

        if (channel.type !== ChannelType.GuildText) {
            embed
                .setDescription("Please provide a valid text channel")
                .setColor(client.color.red);
            return ctx.sendMessage({ embeds: [embed] });
        }

        const data = await this.client.prisma.guild.findUnique({ where: { guildId: ctx.guild.id } });
        if (!data) {
            await this.client.prisma.guild.create({ data: { guildId: ctx.guild.id, welcomeChannel: channel.id } });
        } else {
            await this.client.prisma.guild.update({ where: { guildId: ctx.guild.id }, data: { welcomeChannel: channel.id } });
        }
    }
}