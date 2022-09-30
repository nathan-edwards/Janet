const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const request = require("request");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Gets a random dog picture"),
  async execute(interaction) {
    try {
      request(
        "https://dog.ceo/api/breeds/image/random",
        function (error, body) {
          var result = JSON.parse(body.body);
          let embed = new EmbedBuilder()
            .setColor(colors.default)
            .setImage(result.message)
            .setFooter({
              text: `${interaction.member.user.tag}`,
              iconURL: interaction.member.user.avatarURL(),
            })
            .setTimestamp();

          interaction.reply({
            embeds: [embed],
          });
        }
      );
    } catch (err) {
      const errors = require("../modules/errors.js");
      errors.embedError(err, lang, interaction);
    }
  },
};
