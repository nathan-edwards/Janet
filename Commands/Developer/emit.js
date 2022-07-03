const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Event emitter.")
    // .setDefaultMemberPermissions("ADMINISTRATOR")
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The event to emit.")
        .setRequired(true)
        .addChoices(
          { name: "guildMemberAdd", value: "guildMemberAdd" },
          { name: "guildMemberRemove", value: "guildMemberRemove" }
        )
    ),
  execute(interaction) {
    const { options } = interaction;
    const event = options.getString("event");
    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      switch (event) {
        case "guildMemberAdd": {
          interaction.client.emit("guildMemberAdd", interaction.member);
          return interaction.reply({
            content: "Emitted 'guildMemberAdd'.",
            ephemeral: true,
          });
        }
        case "guildMemberRemove": {
          interaction.client.emit("guildMemberRemove", interaction.member);
          return interaction.reply({
            content: "Emitted 'guildMemberRemove'.",
            ephemeral: true,
          });
        }
      }
    } else {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
