import { Event } from "../../structures/index.js";
export default class TrackEnd extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "trackEnd",
        });
    }
    async run(player, track, dispatcher) {
        dispatcher.previous = dispatcher.current;
        dispatcher.current = null;
        if (dispatcher.loop === "repeat")
            dispatcher.queue.unshift(track);
        if (dispatcher.loop === "queue")
            dispatcher.queue.push(track);
        await dispatcher.play();
        if (dispatcher.autoplay) {
            await dispatcher.Autoplay(track);
        }
        const m = await dispatcher.nowPlayingMessage?.fetch().catch(() => { });
        if (m && m.deletable)
            m.delete().catch(() => { });
    }
}
//# sourceMappingURL=TrackEnd.js.map