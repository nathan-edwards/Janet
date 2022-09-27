const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const colors = require("../../assets/json/colors.json");

module.exports = {
    name: "trackStart",
    execute(player, queue, track) {
        if(!queue.guild.members.me.permissionsIn(queue.metadata.channel).has(player.client.requiredTextPermissions)) {
            console.log(`(${queue.guild.name}) destroying queue due to missing text channel permissions`);
            return queue.destroy();
        }
        if(queue.npmessage && queue.npmessage.editable) {
            queue.npmessage.delete().catch(error=> {});
        }
        let row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('buttoncontrol_play')
                    .setLabel('Pause')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('buttoncontrol_skip')
                    .setLabel('Skip')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('buttoncontrol_disconnect')
                    .setLabel('Disconnect')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('buttoncontrol_queue')
                    .setLabel('Show queue')
                    .setStyle(ButtonStyle.Secondary)
            )
        const title = ['spotify-custom', 'soundcloud-custom'].includes(track.source) ?
            `${track.author} - ${track.title}` : `${track.title}`;
        queue.metadata.channel.send({
            embeds: [
                {
                    title: `Now playing`,
                    description: `**[${title}](${track.url})** - ${track.requestedBy}`,
                    thumbnail: {
                        url: `${track.thumbnail}`
                    },
                    color: colors.default,
                }
            ],
            components: [row]
        }).then((msg) => {
            queue.npmessage = msg;
        }).then( () => { // Webplayer Auto-Update
            if( player.client.hasWebplayer )
            player.client.io.to(queue.guild.id).emit("forceUpdate", {from: "music-trackStart"});
        });
    }
}