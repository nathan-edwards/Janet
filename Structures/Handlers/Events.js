const fs = require('fs');
const { Events } = require("../Validation/EventNames");

module.exports = async (client, Ascii) => {
  client.handleEvents = async () => {
    const Table = new Ascii("Events Loaded");

    fs.readdirSync("./Events/").forEach(async (dir) => {
      const files = fs
        .readdirSync(`./Events/${dir}/`)
        .filter((file) => file.endsWith(".js"));

      for (const file of files) {
        const event = require(`../../Events/${dir}/${file}`);

        if (!Events.includes(event.name) || !event.name) {
          const L = file.split("/");
          await Table.addRow(
            `${event.name || "MISSING"}`,
            `🛑 Event name is either invalid or missing: ${L[6]} + ` /
              ` + L[7]}`
          );
          return;
        }

        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client));
        }

        await Table.addRow(`${event.name}`, `✅ LOADED`);
      }
    });

    console.log(Table.toString());
  };
};
