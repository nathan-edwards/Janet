import { Janet, Context, Command } from "../../structures/index.js";
export default class Help extends Command {
    constructor(client: Janet);
    run(client: Janet, ctx: Context, args: string[]): Promise<void>;
}
