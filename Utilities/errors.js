const { EmbedBuilder } = require("discord.js");
const colors = require("../../assets/json/colors.json");
const stack = require("error-stack-parser");

module.exports = {
  embedError: function (err, lang, message) {
    let embed = new EmbedBuilder()
      .setTitle(`❌ ${lang.ErrorOccurred}`)
      .setColor(colors.red)
      .addFields([
        { name: "Error", value: `\`${err}\`` },
        {
          name: "Location",
          value: `\`${stack.parse(err)[0].fileName}:${
            stack.parse(err)[0].lineNumber
          }:${stack.parse(err)[0].columnNumber}\``,
        },
      ])
      .setTimestamp();

    message.channel
      .send({
        embeds: [embed],
      })
      .catch();
  },
  embedInvalidSyntax: function (err, lang, message) {
    // Coming soon tm
    let embed = new EmbedBuilder()
      .setTitle(`❌ ${lang.ErrorOccurred}`)
      .setColor(colors.red)
      .addFields([
        { name: "Error2", value: `\`${err}\`` },
        {
          name: "Location",
          value: `\`${stack.parse(err)[0].fileName}:${
            stack.parse(err)[0].lineNumber
          }:${stack.parse(err)[0].columnNumber}\``,
        },
      ])
      .setTimestamp();

    message.channel
      .send({
        embeds: [embed],
      })
      .catch();
  },
};
