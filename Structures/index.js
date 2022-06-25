const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });

const { mongoose } = require("mongoose");
const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);

client.commands = new Collection();

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SoundCloudPlugin } = require("@distube/soundcloud");

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  youtubeDL: false,
  plugins: [
    new SpotifyPlugin(),
    new YtDlpPlugin(),
    new SoundCloudPlugin(),
  ],
});

module.exports = client;

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});

require("dotenv").config();

client.login(process.env.TOKEN);
