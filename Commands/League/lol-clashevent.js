const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const path = require("node:path");
const riotAPI = require("../../API/riot-api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("schedule-clash-event")
    .setDescription("Next Clash Date.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("region")
        .setDescription("The region to get the clash event from.")
        .setRequired(true)
        .addChoices(
          { name: "BR", value: "br1" },
          { name: "EUN", value: "eun1" },
          { name: "EUW", value: "euw1" },
          { name: "JP", value: "jp1" },
          { name: "KR", value: "kr" },
          { name: "LA1", value: "la1" },
          { name: "LA2", value: "la2" },
          { name: "NA", value: "na1" },
          { name: "OC", value: "oc1" },
          { name: "TR", value: "tr1" },
          { name: "RU", value: "ru" }
        )
    ),
  async execute(interaction) {
    try {
      riotAPI(
        interaction.options.getString("region"),
        `/lol/clash/v1/tournaments`
      ).then((data) => {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data.length - i - 1; j++) {
            if (
              data[j + 1].schedule[0].startTime < data[j].schedule[0].startTime
            ) {
              // ES6 way of swapping array elements
              [data[j + 1], data[j]] = [data[j], data[j + 1]];
            }
          }
        }

        const capitalize = (s) => {
          if (typeof s !== "string") return "";
          return s.charAt(0).toUpperCase() + s.slice(1);
        };

        function titleCase(s) {
          return s
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(" ");
        }

        const removeUnderscore = (s) => {
          if (typeof s !== "string") return "";
          return s.replace("_", " ");
        };

        const baseImagePath = path.join(
          __dirname,
          "../../images/clash-splash/"
        );
        interaction.guild.channels.fetch().then((channels) => {
          for (const [key, value] of channels.entries()) {
            if (value.name == "Clash") {
              if (
                data[0].nameKeySecondary == "day_1" ||
                data[0].nameKeySecondary == "day_3"
              ) {
                interaction.guild.scheduledEvents.create({
                  name:
                    "Clash: " +
                    titleCase(removeUnderscore(data[0].nameKey)) +
                    " Cup " +
                    titleCase(
                      removeUnderscore(
                        data[0].nameKeySecondary.replace("_", " ")
                      )
                    ),
                  scheduledStartTime: data[0].schedule[0].startTime,
                  privacyLevel: 2,
                  entityType: 2,
                  channel: key,
                  image: `${baseImagePath}${data[0].nameKey}.jpg`,
                });
                interaction.guild.scheduledEvents.create({
                  name:
                    "Clash: " +
                    titleCase(removeUnderscore(data[1].nameKey)) +
                    " Cup " +
                    titleCase(
                      removeUnderscore(
                        data[1].nameKeySecondary.replace("_", " ")
                      )
                    ),
                  scheduledStartTime: data[1].schedule[0].startTime,
                  privacyLevel: 2,
                  entityType: 2,
                  channel: value,
                  image: `${baseImagePath}${data[0].nameKey}.jpg`,
                });
              } else {
                interaction.guild.scheduledEvents.create({
                  name:
                    "Clash: " +
                    titleCase(removeUnderscore(data[0].nameKey)) +
                    " Cup " +
                    titleCase(
                      removeUnderscore(
                        data[0].nameKeySecondary.replace("_", " ")
                      )
                    ),
                  scheduledStartTime: data[0].schedule[0].startTime,
                  privacyLevel: 2,
                  entityType: 2,
                  channel: value,
                  image: `${baseImagePath}${data[0].nameKey}.jpg`,
                });
              }
            }
          }
        });
        interaction.reply({
          content: "Clash Events Created",
          ephemeral: true,
        });
      });
    } catch (error) {
      interaction.reply({
        content: "Error: " + error,
        ephemeral: true,
      });
    }
  },
};
