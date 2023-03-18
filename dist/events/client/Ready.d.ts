import { Event, Janet } from "../../structures/index.js";
export default class Ready extends Event {
    constructor(client: Janet, file: string);
    run(): Promise<void>;
}
