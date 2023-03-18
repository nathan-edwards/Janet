import { Event, Janet } from "../../structures/index.js";
import { Node } from "shoukaku";

export default class NodeConnect extends Event {
  constructor(client: Janet, file: string) {
    super(client, file, {
      name: "nodeConnect",
    });
  }
  public async run(node: Node): Promise<void> {
    this.client.logger.success(`Node ${node.name} is ready!`);
  }
}
