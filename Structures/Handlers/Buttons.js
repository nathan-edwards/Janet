const fs = require("fs");

module.exports = async (client, Ascii) => {
  client.handleButtons = async () => {
    const Table = new Ascii("Buttons Loaded");

    fs.readdirSync("./Buttons/").forEach(async (dir) => {
      const files = fs
        .readdirSync(`./Buttons/${dir}/`)
        .filter((file) => file.endsWith(".js"));

      for (const file of files) {
        const button = require(`../../Buttons/${dir}/${file}`);
        client.buttons.set(button.id, button);
        await Table.addRow(`${button.id}`, `✅ LOADED`);
      }
    });
    console.log(Table.toString());
  };
};
