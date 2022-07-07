module.exports = {
  name: "messageCreate",
  execute(interaction, client) {
    if (interaction.author.bot) return;

    if (!interaction.content.startsWith(client.prefix)) return;

    if (
      !interaction.guild.me
        .permissionsIn(interaction.channel)
        .has(client.requiredTextPermissions)
    )
      return;

    const args = interaction.content
      .substring(client.prefix.length)
      .split(/ +/);

    const command = client.commands.find(
      (cmd) => cmd.name == args[0] || cmd.aliases.includes(args[0])
    );

    if (!command) return;

    if (
      !interaction.member
        .permissionsIn(interaction.channel)
        .has(command.permission)
    )
      return interaction.reply(
        `You do not have the permission \`${command.permission}\` to run this command!`
      );

    args.splice(0, 1);
    command.run(interaction, args, client, false).then(() => {
      // Webplayer Auto-Update
      if (!client.hasWebplayer) return;

      [
        "disconnect",
        "loop",
        "clear",
        "pause",
        "play",
        "remove",
        "resume",
        "seek",
      ].forEach((cn) => {
        if (cn == command.name) {
          client.io
            .to(interaction.guild.id)
            .emit("forceUpdate", { from: "messageCreate-" + command.name });
        }
      });
    });
  },
};
