import { Event, Janet, Dispatcher } from "../../structures/index.js";
import { Player } from "shoukaku";
import { Song } from "../../structures/Dispatcher.js";

export default class TrackEnd extends Event {
  constructor(client: Janet, file: string) {
    super(client, file, {
      name: "trackEnd",
    });
  }
  public async run(
    player: Player,
    track: Song,
    dispatcher: Dispatcher
  ): Promise<void> {
    dispatcher.previous = dispatcher.current;
    dispatcher.current = null;
    if (dispatcher.loop === "repeat") dispatcher.queue.unshift(track);
    if (dispatcher.loop === "queue") dispatcher.queue.push(track);
    await dispatcher.play();
    if (dispatcher.autoplay) {
      await dispatcher.Autoplay(track);
    }
    const m = await dispatcher.nowPlayingMessage?.fetch().catch(() => { });
    if (m && m.deletable) m.delete().catch(() => { });
  }
}
