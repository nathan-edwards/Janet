import Janet from "./structures/Janet.js";
import { GatewayIntentBits } from "discord.js";
import config from "./config.js";
const { GuildMembers, MessageContent, GuildVoiceStates, GuildMessages, Guilds, GuildMessageTyping, } = GatewayIntentBits;
const clientOptions = {
    intents: [
        Guilds,
        GuildMessages,
        MessageContent,
        GuildVoiceStates,
        GuildMembers,
        GuildMessageTyping,
    ],
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: false,
    },
};
const client = new Janet(clientOptions);
client.start(config.token);
//# sourceMappingURL=index.js.map