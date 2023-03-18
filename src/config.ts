import dotent from "dotenv";
import { SearchEngine } from "./types.js";
dotent.config();

export default {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  color: {
    red: 0xf74847,
    green: 0x6db966,
    blue: 0x3498db,
    yellow: 0xffd801,
    main: 0x6db966,
  },
  searchEngine:
    process.env.SEARCH_ENGINE || (SearchEngine.SoundCloud as SearchEngine),
  maxPlaylistSize: parseInt(process.env.MAX_PLAYLIST_SIZE) || 100,
  maxQueueSize: parseInt(process.env.MAX_QUEUE_SIZE) || 100,
  owners: process.env.OWNERS?.split(","),
  database: process.env.DATABASE_URL,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  production: parseBoolean(process.env.PRODUCTION) || true,
  lavalink: [
    {
      url: process.env.LAVALINK_URL,
      auth: process.env.LAVALINK_AUTH,
      name: process.env.LAVALINK_NAME,
      secure: parseBoolean(process.env.LAVALINK_SECURE) || false,
    },
  ],
};

function parseBoolean(value: string | undefined): boolean {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case "true":
      return true;
    default:
      return false;
  }
}
