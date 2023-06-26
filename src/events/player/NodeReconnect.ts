import { Event, Janet } from "../../structures/index.js";
import { Node } from "shoukaku";

export default class NodeReconnect extends Event {
  constructor(client: Janet, file: string) {
    super(client, file, {
      name: "nodeReconnect",
    });
  }
  public async run(node: Node): Promise<void> {
    this.client.logger.success(`Node ${node.name} has reconnected!`);
  }
}
