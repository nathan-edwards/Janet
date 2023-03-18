import { ChannelType } from "discord.js";
import { Command } from "../../structures/index.js";
export default class ServerInfo extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            description: {
                content: "Get information about the server",
                examples: ["serverinfo"],
                usage: "serverinfo",
            },
            category: "info",
            aliases: ["si"],
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
        const guild = ctx.guild;
        const { createdTimestamp, ownerId, description, members, memberCount, channels, } = guild;
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(client.color.green)
                    .setTitle(`📝 ${guild.name}`)
                    .setAuthor({
                    name: guild.name,
                    iconURL: guild.iconURL({ size: 512 }),
                })
                    .setThumbnail(guild.iconURL({ size: 512 }))
                    .addFields({
                    name: "GENERAL",
                    value: `
                  Name: ${guild.name}
                  Created: <t:${Math.round(createdTimestamp / 1000)}:R>
                  Owner: <@${ownerId}>
                  
                  Description: ${description}
                  
                  `,
                }, {
                    name: "💡 | USERS",
                    value: `
                  - Members: ${members.cache.filter((m) => !m.user.bot).size}
                  - Bots: ${members.cache.filter((m) => m.user.bot).size}
          
                  Total: ${memberCount}
                  `,
                }, {
                    name: "📘 | CHANNELS",
                    value: `
                    - Text: ${channels.cache.filter((c) => c.type === ChannelType.GuildText).size}
                    - Voice: ${channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}
                    - Threads: ${channels.cache.filter((c) => c.type === ChannelType.AnnouncementThread &&
                        ChannelType.PrivateThread &&
                        ChannelType.PublicThread).size}
                    - Categories: ${channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}
                    - Stages: ${channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}
                    - News: ${channels.cache.filter((c) => c.type === ChannelType.GuildAnnouncement).size}
          
                    Total: ${channels.cache.size}
                    `,
                })
            ]
        });
    }
}
//# sourceMappingURL=ServerInfo.js.map