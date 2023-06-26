import Janet from "./Janet.js";

export default class Component {
    public client: Janet;
    public name: string;
    public one: boolean;
    constructor(client: Janet, options: ComponentOptions) {
        this.client = client;
        this.name = options.name;
        this.one = options.one || false;
    }
    public async run(...args: any[]): Promise<any> {
        return Promise.resolve();
    }
}

interface ComponentOptions {
    name: string;
    one?: boolean;
}