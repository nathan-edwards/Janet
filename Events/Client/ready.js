const { CommandInteraction } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {CommandInteraction} interaction
   */
  execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`The client is now ready!`);
    client.user.setActivity("Hi There!");

    if (!process.env.MONGO_URI) {
      console.log("No MONGO_URI found, exiting...");
      process.exit(1);
    } else {
      mongoose
        .connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          keepAlive: true,
        })
        .then(() => {
          console.log("The client is now connected to the database!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
};
