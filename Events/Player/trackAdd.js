module.exports = {
  name: "trackAdd",
  execute(player, queue, track) {
    // Webplayer
    if (player.client.hasWebplayer)
      player.client.io
        .to(queue.guild.id)
        .emit("forceUpdate", { from: "music-trackAdd" });
  },
};
