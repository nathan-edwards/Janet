const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");
const { MessageEmbed } = require("discord.js");
const path = require("node:path");
const colors = require("../../assets/json/colors.json");

module.exports = {
  data: new SlashCommandBuilder()
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName("kill-janet")
    .setDescription("Kill Janet."),
  async execute(interaction) {
    // if (interaction.member.voice.channelId) {
    //   const voiceChannelId = interaction.member.voice.channelId;
    //   const voiceChannel = interaction.guild.channels.cache.get(voiceChannelId);
    //   const guildId = interaction.guild.id;
    //   const player = createAudioPlayer();
    //   const resource = createAudioResource(
    //     process.cwd(),
    //     "./assets/audio/kill-janet.mp3"
    //   );
    //   player.play(resource);
    //   const connection = await joinVoiceChannel({
    //     channelId: voiceChannelId,
    //     guildId: guildId,
    //     adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    //   });
    //   const subscription = connection.subscribe(player);
    //   if (subscription) {
    //     // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
    //     setTimeout(() => subscription.unsubscribe(), 5_000);
    //   }
    //   const Response = new MessageEmbed()
    //     .setColor(colors.red)
    //     .setTitle("ATTENTION! I have been murdered 😊")
    //     .setImage(
    //       "https://c.tenor.com/FZfzOwrrJWsAAAAC/janet-the-good-place.gif"
    //     );
    //   await interaction.reply({
    //     embeds: [Response],
    //   });
    // } else {
    const Response = new MessageEmbed()
      .setColor(colors.red)
      .setImage(
        "https://c.tenor.com/FZfzOwrrJWsAAAAC/janet-the-good-place.gif"
      );
    await interaction.reply({
      embeds: [Response],
      content: "ATTENTION! I have been murdered 😊",
      tts: true,
    });
    // }
    process.exit();
  },
};
