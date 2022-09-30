require("dotenv").config();
const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const Ascii = require("ascii-table");
const fs = require("fs");
const client = new Client({
  partials: [
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.User, // for discord user
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildVoiceStates, // for voice related things
  ],
});

client.commands = new Collection();
client.player = new DisTube(client, {
  leaveOnStop: false,
  leaveOnFinish: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: true }),
  ],
});

const player = client.player;

module.exports = client;

// const buttonFolders = fs.readdirSync("./Commands");
const commandFolders = fs.readdirSync("./Commands");
const eventFolders = fs.readdirSync("./Events");
(async () => {
  ["Events", "Commands"].forEach((handler) => {
    require(`./Handlers/${handler}`)(client, Ascii);
  });
  client.handleCommands(commandFolders, "./Commands");
  client.handleEvents(eventFolders, "./Events");
  // client.handleButtons(buttonFolders, "./Buttons");
  client.login(process.env.TOKEN);
})();
