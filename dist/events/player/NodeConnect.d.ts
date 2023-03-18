import { Event, Janet } from "../../structures/index.js";
import { Node } from "shoukaku";
export default class NodeConnect extends Event {
    constructor(client: Janet, file: string);
    run(node: Node): Promise<void>;
}
