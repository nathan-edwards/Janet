import { Event } from "../../structures/index.js";
import { ActivityType } from "discord.js";
export default class Ready extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "ready",
        });
    }
    async run() {
        this.client.logger.success(`Successfully logged in as ${this.client.user?.tag}!`);
        this.client.user?.setActivity({
            name: "Hi There!",
            type: ActivityType.Listening,
        });
    }
}
//# sourceMappingURL=Ready.js.map