const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const request = require("request");
const colors = require("../../Utilities/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Gets a random cat picture"),
  async execute(interaction) {
    try {
      request("http://aws.random.cat/meow", function (error, body) {
        var result = JSON.parse(body.body);
        let embed = new MessageEmbed()
          .setColor(colors.default)
          .setImage(result.file)
          .setFooter({
            text: `${interaction.member.user.tag}`,
            iconURL: interaction.member.user.avatarURL(),
          })
          .setTimestamp();

        interaction.reply({
          embeds: [embed],
        });
      });
    } catch (err) {
      const errors = require("../modules/errors.js");
      errors.embedError(err, lang, interaction);
    }
  },
};
