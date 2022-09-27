require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Player } = require("discord-player");
const { Lyrics } = require("@discord-player/extractor");

const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const fs = require("fs");
const PG = promisify(glob);

client.commands = new Collection();

client.player = new Player(client, {
  initialVolume: 50,
  bufferingTimeout: 1000,
  disableVolume: false, // disabling volume controls can improve performance
  leaveOnEnd: true,
  leaveOnStop: true,
  // leaveOnEmpty: true,  // Issue due to discord-player
  // leaveOnEmptyCooldown: 60000,
  spotifyBridge: true,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.lyrics = Lyrics.init(process.env.GENIUS_TOKEN);

module.exports = client;

const commandFolders = fs.readdirSync("./Commands");
const eventFolders = fs.readdirSync("./Events");
(async () => {
  ["Events", "Commands"].forEach((handler) => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
  });
  client.handleCommands(commandFolders, "./Commands");
  client.handleEvents(eventFolders, "./Events");
  client.login(process.env.TOKEN);
})();
