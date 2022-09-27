module.exports = {
  name: "queueEnd",
  execute(player, queue) {
    if (queue.npmessage && queue.npmessage.editable) {
      queue.npmessage.delete().catch((error) => {});
    }
  },
};
