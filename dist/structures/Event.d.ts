import Janet from "./Janet.js";
export default class Event {
    client: Janet;
    one: boolean;
    file: string;
    name: string;
    fileName: string;
    constructor(client: Janet, file: string, options: EventOptions);
    run(...args: any[]): Promise<any>;
}
interface EventOptions {
    name: string;
    one?: boolean;
}
export {};
