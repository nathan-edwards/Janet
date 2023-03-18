import { Command, Janet, Context } from "../../structures/index.js";
export default class Dog extends Command {
    constructor(client: Janet);
    run(client: Janet, ctx: Context, args: string[]): Promise<void>;
}
