import { Command } from "../../structures/index.js";
import { getLyrics, searchSong } from "../../api/Genius.js";
export default class Lyrics extends Command {
    constructor(client) {
        super(client, {
            name: "lyrics",
            description: {
                content: "Shows the lyrics of the current song",
                examples: ["lyrics"],
                usage: "lyrics",
            },
            category: "music",
            aliases: ["ly"],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: false,
                active: true,
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
        var player = client.queue.get(ctx.guild.id);
        console.log(player);
        var data = await searchSong(player.current.info.title);
        if (player.current.info.thumbnail === undefined)
            player.current.info.thumbnail = data[0].result.header_image_url;
        const lyrics = await getLyrics(data[0].result.id);
        if (player.queue.length === 0)
            return ctx.sendMessage({
                embeds: [
                    this.client.embed()
                        .setColor(this.client.color.main)
                        .setAuthor({ name: "Disco Janet 🎶 Lyrics ", iconURL: "https://i.ibb.co/b3mnh2f/disco-janet.png" })
                        .setThumbnail(player.current.info.thumbnail)
                        .setTitle(player.current.info.title)
                        .setDescription(`by ${data[0].result.artist_names}\n${lyrics}`)
                        .setFooter({ text: `Requested by ${ctx.author.username}`, iconURL: ctx.author.avatarURL() })
                ]
            });
    }
}
//# sourceMappingURL=Lyrics.js.map