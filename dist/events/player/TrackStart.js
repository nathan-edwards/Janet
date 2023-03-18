import { Event } from "../../structures/index.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, } from "discord.js";
export default class TrackStart extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "trackStart",
        });
    }
    async run(player, track, dispatcher) {
        const guild = this.client.guilds.cache.get(player.connection.guildId);
        if (!guild)
            return;
        const textChannel = guild.channels.cache.get(dispatcher.channelId);
        if (!textChannel)
            return;
        const button = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId("previous")
            .setLabel(`Previous`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(dispatcher.previous ? false : true), new ButtonBuilder()
            .setCustomId("resume")
            .setLabel(player.paused ? `Resume` : `Pause`)
            .setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId("stop")
            .setLabel(`Stop`)
            .setStyle(ButtonStyle.Danger), new ButtonBuilder()
            .setCustomId("skip")
            .setLabel(`Skip`)
            .setStyle(ButtonStyle.Secondary), new ButtonBuilder()
            .setCustomId("loop")
            .setLabel(`Loop`)
            .setStyle(ButtonStyle.Secondary));
        const embed = this.client
            .embed()
            .setAuthor({
            name: "Now Playing",
            iconURL: this.client.user.displayAvatarURL(),
        })
            .setColor(this.client.color.main)
            .setDescription(`**[${track.info.title}](${track.info.uri})**`)
            .setFooter({
            text: `Requested by ${track.info.requester.tag}`,
            iconURL: track.info.requester.avatarURL({}),
        })
            .setThumbnail(track.info.thumbnail)
            .addFields({
            name: "Duration",
            value: track.info.isStream
                ? "LIVE"
                : this.client.utils.formatTime(track.info.length),
            inline: true,
        }, { name: "Author", value: track.info.author, inline: true })
            .setTimestamp();
        const message = await textChannel.send({
            embeds: [embed],
            components: [button],
        });
        dispatcher.nowPlayingMessage = message;
        const collector = message.createMessageComponentCollector({
            filter: (b) => {
                if (b.guild.members.me.voice.channel &&
                    b.guild.members.me.voice.channelId === b.member.voice.channelId)
                    return true;
                else {
                    b.reply({
                        content: `You are not connected to <#${b.guild.members.me.voice?.channelId ?? "None"}> to use this buttons.`,
                        ephemeral: true,
                    });
                    return false;
                }
            },
            time: track.info.isStream ? 86400000 : track.info.length,
        });
        collector.on("collect", async (interaction) => {
            switch (interaction.customId) {
                case "previous":
                    if (!dispatcher.previous) {
                        await interaction.reply({
                            content: `There is no previous song.`,
                            ephemeral: true,
                        });
                        return;
                    }
                    else
                        dispatcher.previousTrack();
                    if (message)
                        await message.edit({
                            embeds: [
                                embed.setFooter({
                                    text: `Previous by ${interaction.user.tag}`,
                                    iconURL: interaction.user.avatarURL({}),
                                }),
                            ],
                            components: [button],
                        });
                    break;
                case "resume":
                    dispatcher.pause();
                    if (message)
                        await message.edit({
                            embeds: [
                                embed.setFooter({
                                    text: `${player.paused ? "Paused" : "Resumed"} by ${interaction.user.tag}`,
                                    iconURL: interaction.user.avatarURL({}),
                                }),
                            ],
                            components: [button],
                        });
                    break;
                case "stop":
                    dispatcher.stop();
                    if (message)
                        await message.edit({
                            embeds: [
                                embed.setFooter({
                                    text: `Stopped by ${interaction.user.tag}`,
                                    iconURL: interaction.user.avatarURL({}),
                                }),
                            ],
                            components: [],
                        });
                    break;
                case "skip":
                    if (!dispatcher.queue.length) {
                        await interaction.reply({
                            content: `There is no more song in the queue.`,
                            ephemeral: true,
                        });
                        return;
                    }
                    dispatcher.skip();
                    if (message)
                        await message.edit({
                            embeds: [
                                embed.setFooter({
                                    text: `Skipped by ${interaction.user.tag}`,
                                    iconURL: interaction.user.avatarURL({}),
                                }),
                            ],
                            components: [button],
                        });
                    break;
                case "loop":
                    switch (dispatcher.loop) {
                        case "off":
                            dispatcher.loop = "repeat";
                            if (message)
                                await message.edit({
                                    embeds: [
                                        embed.setFooter({
                                            text: `Looping by ${interaction.user.tag}`,
                                            iconURL: interaction.user.avatarURL({}),
                                        }),
                                    ],
                                    components: [button],
                                });
                            break;
                        case "repeat":
                            dispatcher.loop = "queue";
                            if (message)
                                await message.edit({
                                    embeds: [
                                        embed.setFooter({
                                            text: `Looping Queue by ${interaction.user.tag}`,
                                            iconURL: interaction.user.avatarURL({}),
                                        }),
                                    ],
                                    components: [button],
                                });
                            break;
                        case "queue":
                            dispatcher.loop = "off";
                            if (message)
                                await message.edit({
                                    embeds: [
                                        embed.setFooter({
                                            text: `Looping Off by ${interaction.user.tag}`,
                                            iconURL: interaction.user.avatarURL({}),
                                        }),
                                    ],
                                    components: [button],
                                });
                            break;
                    }
                    break;
            }
            await interaction.deferUpdate();
        });
    }
}
//# sourceMappingURL=TrackStart.js.map