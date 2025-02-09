const mongoose = require("mongoose");
const validator = require("validator");

const RoomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Image should be a valid URL",
    },
  },
  content: {
    type: String,
    required: true,
  },
  max_capacity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
