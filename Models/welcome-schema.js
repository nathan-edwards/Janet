const { mongoose, Schema } = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const welcomeSchema = new Schema({
  // Guild ID
  _id: reqString,
  channelID: reqString,
  message: reqString,
  embed: {
    title: String,
    description: String,
    color: String,
    fields: [
      {
        name: String,
        value: String,
        inline: Boolean,
      },
    ],
    timestamp: Date,
    footer: {
      text: String,
      icon_url: String,
    },
    thumbnail: {
      url: String,
    },
    image: {
      url: String,
    },
  },
});

const name = "welcome";
module.exports = mongoose.models[name] || mongoose.model(name, welcomeSchema, name);
