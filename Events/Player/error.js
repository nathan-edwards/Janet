module.exports = {
  name: "error",
  execute(player, queue, error) {
    console.log(`(${queue.guild.name}) error: ${error.message}`);
  },
};
