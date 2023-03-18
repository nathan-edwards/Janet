import { Janet, Context, Command } from "../../structures/index.js";
export default class Pause extends Command {
    constructor(client: Janet);
    run(client: Janet, ctx: Context, args: string[]): Promise<void>;
}
