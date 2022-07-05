require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Player } = require("discord-player");

const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const fs = require("fs");
const PG = promisify(glob);

client.commands = new Collection();

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

module.exports = client;

const commandFolders = fs.readdirSync("./Commands");
(async () => {
  ["Events", "Commands"].forEach((handler) => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
  });
  client.handleCommands(commandFolders, "./Commands");
  client.handleEvents();
  client.login(process.env.TOKEN);
})();
