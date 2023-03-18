import { Event, Janet } from "../../structures/index.js";
import { Message } from "discord.js";
export default class MessageCreate extends Event {
    constructor(client: Janet, file: string);
    run(message: Message): Promise<any>;
}
