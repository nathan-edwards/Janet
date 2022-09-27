const { EmbedBuilder, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;
    const message = "Welcome to the server, " + user.username + "!";
    guild.channels.fetch().then((channels) => {
      for (const [key, value] of channels.entries()) {
        if (value.name == "welcome") {
          guild.channels.fetch(key).then((channel) => {
            channel.send(message);
          });
        }
      }
    });
  },
};
