const { SlashCommandBuilder } = require("@discordjs/builders");
const colors = require("../../assets/json/colors.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("WIP")
    // .setDescription("Shows the current song playing")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The channel to show the now playing message in")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    // const queue = client.player.getQueue(interaction.guild);
    // const { options } = interaction;
    // if (options.getString("song") || (queue && queue.playing)) {
    //   let query;
    //   if (options.getString("song"))
    //     query = options.getString("song");
    //   else query = queue.current.title;

    //   const result = await client.lyrics.search(query);
    //   if (!result) {
    //     interaction.reply({
    //       embeds: [
    //         {
    //           description: !args
    //             ? "No lyrics found for `" +
    //               query +
    //               "`.\nTry manually searching using `" +
    //               client.prefix +
    //               "lyrics <songtitle>`"
    //             : "No lyrics found for `" +
    //               query +
    //               "`. Try being more specific with your query!",
    //           color: colors.red,
    //         },
    //       ],
    //       ephemeral: true,
    //     });
    //   } else {
    //     let trimmedLyrics =
    //       result.lyrics.length > 4095
    //         ? result.lyrics.substring(0, 4092) + "..."
    //         : result.lyrics;
    const Response = new EmbedBuilder()
      .setColor(colors.red)
      .setTitle(`🔡 Lyrics Command Comung Soon`);

    return interaction.reply({
      embeds: [Response],
    });
    // }
    // }
  },
};
