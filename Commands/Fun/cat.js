const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const request = require("request");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Gets a random cat picture"),
  async execute(interaction) {
    try {
      request("http://aws.random.cat/meow", function (error, body) {
        var result = JSON.parse(body.body);
        let embed = new EmbedBuilder()
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
