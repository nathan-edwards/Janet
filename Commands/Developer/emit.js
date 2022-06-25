const { CommandInteraction, Permissions } = require("discord.js");

module.exports = {
  name: "emit",
  description: "Event emitter.",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "event",
      description: "The event to emit.",
      required: true,
      type: "STRING",
      choices: [
        { name: "guildMemberAdd", value: "guildMemberAdd" },
        { name: "guildMemberRemove", value: "guildMemberRemove" },
      ],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
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
