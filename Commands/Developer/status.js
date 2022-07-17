const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { connection } = require("mongoose");
const { MessageEmbed } = require("discord.js");
const colors = require("../../assets/json/colors.json");

require("../../Events/Client/ready");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Shows the status of the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const Response = new MessageEmbed()
      .setColor(colors.default)
      .setDescription(
        `**Client**: \`🟢 Online\` - \`${
          client.ws.ping
        }ms\`\n **Uptime**: <t:${parseInt(
          client.readyTimestamp / 1000
        )}:R>\n**Database**: \`${switchTo(connection.readyState)}\``
      );
    interaction.reply({ embeds: [Response] });
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = `🛑 DISCONNECTED`;
      break;
    case 1:
      status = `🟢 CONNECTED`;
      break;
    case 2:
      status = `🟠 CONNECTING`;
      break;
    case 3:
      status = `🔴 DISCONNECTING`;
      break;
    case 4:
      status = `🔵 IDLE`;
      break;
    case 5:
      status = `🟣 RECONNECTING`;
      break;
  }
  return status;
}
