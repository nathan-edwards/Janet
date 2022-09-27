module.exports = {
  name: "connectionError",
  execute(player, queue, error) {
    console.log(`(${queue.guild.name}) connectionError: ${error.message}`);
  },
};
