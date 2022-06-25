const { CommandInteraction } = require("discord.js");
const riotAPI = require("../API/riot-api");

// /**
//  * TODO: Give all ranked data for a specific summoner
//  */

module.exports = {
  name: "lol-ranked",
  description: "Ranked info for LoL Player.",
  //   options: [
  //     {
  //       name: "region",
  //       description: "The region of the summoner",
  //       required: true,
  //       type: "STRING",
  //       choices: [
  //         { name: "BR", value: "br1" },
  //         { name: "EUN", value: "eun1" },
  //         { name: "EUW", value: "euw1" },
  //         { name: "JP", value: "jp1" },
  //         { name: "KR", value: "kr" },
  //         { name: "LA1", value: "la1" },
  //         { name: "LA2", value: "la2" },
  //         { name: "NA", value: "na1" },
  //         { name: "OC", value: "oc1" },
  //         { name: "TR", value: "tr1" },
  //         { name: "RU", value: "ru" },
  //       ],
  //     },
  //     {
  //       name: "summoner",
  //       description: "The summoner name",
  //       required: true,
  //       type: "STRING",
  //     },
  //   ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // riotAPI(
    //   interaction.options.getString("region"),
    //   `/lol/summoner/v4/summoners/by-name/${interaction.options.getString(
    //     "summoner"
    //   )}`
    // ).then((data) => {
    //   riotAPI(
    //     interaction.options.getString("region"),
    //     `/lol/league/v4/entries/by-summoner/${data.id}`
    //   ).then((data2) => {
    //     interaction.reply({ content: data2[0].rank, ephemeral: true });
    //   });
    // });
    interaction.reply({ content: "Not implemented yet", ephemeral: true });
  },
};
