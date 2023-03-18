import { Event, Janet, Dispatcher } from "../../structures/index.js";
import { Player } from "shoukaku";
import { Song } from "../../structures/Dispatcher.js";
export default class TrackEnd extends Event {
    constructor(client: Janet, file: string);
    run(player: Player, track: Song, dispatcher: Dispatcher): Promise<void>;
}
