const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const message = "Bye Bye, " + interaction.user.username;
    interaction.guild.channels.fetch().then((channels) => {
      for (const [key, value] of channels.entries()) {
        if (value.name == "server-messages") {
          interaction.guild.channels.fetch(key).then((channel) => {
            channel.send(message);
          });
        }
      }
    });
  },
};
