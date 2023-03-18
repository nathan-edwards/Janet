import { Node } from "shoukaku";
import { Janet, Dispatcher } from "./index.js";
import { Guild } from "discord.js";
export declare class Queue extends Map {
    client: Janet;
    constructor(client: Janet);
    get(guildId: string): Dispatcher;
    set(guildId: string, dispatcher: Dispatcher): this;
    delete(guildId: string): boolean;
    clear(): void;
    create(guild: Guild, voice: any, channel: any, givenNode?: Node): Promise<Dispatcher>;
    search(query: string): Promise<any>;
}
