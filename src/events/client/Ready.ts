import { Event, Janet } from "../../structures/index.js";
import { ActivityType } from "discord.js";

export default class Ready extends Event {
  constructor(client: Janet, file: string) {
    super(client, file, {
      name: "ready",
    });
  }
  public async run(): Promise<void> {
    this.client.logger.success(`Successfully logged in as ${this.client.user?.tag}!`);
    this.client.user?.setActivity({
      name: "Hi There!",
      type: ActivityType.Listening,
    });
  }
}
