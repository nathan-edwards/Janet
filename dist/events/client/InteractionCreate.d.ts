import { Event, Janet } from "../../structures/index.js";
import { CommandInteraction, Interaction } from "discord.js";
export default class InteractionCreate extends Event {
    constructor(client: Janet, file: string);
    run(interaction: Interaction | CommandInteraction | any): Promise<void>;
}
