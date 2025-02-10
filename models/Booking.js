const mongoose = require("mongoose");
const statuses = require("../constants/statuses");

const BookingSchema = mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  }, //id и title
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, //id и логин
  date: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    default: statuses.WAITING,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
