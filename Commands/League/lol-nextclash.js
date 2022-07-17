const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const dayjs = require("dayjs");
const riotAPI = require("../../API/riot-api");
const colors = require("../../assets/json/colors.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("next-clash")
    .setDescription("Next Clash Date.")
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

      let text1 = `error`;
      let text2 = `error`;

      if (data[0].nameKeySecondary == "day_1") {
        text1 = `The next Clash theme is **${titleCase(
          removeUnderscore(data[0].nameKey)
        )}**
          The schedule is:
          ${String(dayjs(data[0].schedule[0].startTime))}
          ${String(dayjs(data[1].schedule[0].startTime))}
          ${String(dayjs(data[2].schedule[0].startTime))}
          ${String(dayjs(data[3].schedule[0].startTime))}`;
      } else if (data[0].nameKeySecondary == "day_2") {
        text1 = `The next day in the **${titleCase(
          removeUnderscore(data[0].nameKey)
        )}** Cup is:
          ${String(dayjs(data[0].schedule[0].startTime))}
          \nThe schedule for the second weekend of the **${titleCase(
            removeUnderscore(data[0].nameKey)
          )}** Cup will be:
          ${String(dayjs(data[1].schedule[0].startTime))}
          ${String(dayjs(data[2].schedule[0].startTime))}`;
      } else if (data[0].nameKeySecondary == "day_3") {
        text1 = `The next weekend in the **${titleCase(
          removeUnderscore(data[0].nameKey)
        )}** Cup is:
          ${String(dayjs(data[0].schedule[0].startTime))}
          ${String(dayjs(data[1].schedule[0].startTime))}
          \nThe next Clash theme is **${titleCase(
            removeUnderscore(data[2].nameKey)
          )}**
            The schedule will be:
            ${String(dayjs(data[2].schedule[0].startTime))}
            ${String(dayjs(data[3].schedule[0].startTime))}
            ${String(dayjs(data[4].schedule[0].startTime))}
            ${String(dayjs(data[5].schedule[0].startTime))}
            `;
      } else if (data[0].nameKeySecondary == "day_4") {
        text1 = `The final day of the **${titleCase(
          removeUnderscore(data[0].nameKey)
        )}** Cup is:
        
              ${String(dayjs(data[0].schedule[0].startTime))}
              \nThe next Clash theme is **${titleCase(
                removeUnderscore(data[1].nameKey)
              )}**
                The schedule will be:
                ${String(dayjs(data[1].schedule[0].startTime))}
                ${String(dayjs(data[2].schedule[0].startTime))}
                ${String(dayjs(data[3].schedule[0].startTime))}
                ${String(dayjs(data[4].schedule[0].startTime))}`;
      }

      const Embed = new MessageEmbed()
        .setColor(colors.default)
        .addField(`Clash`, text1);
      interaction.reply({ embeds: [Embed] });
    });
  },
};
