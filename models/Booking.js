// "id": "3a49",
//       "title": "А-frame 2-х местный",
//       "room_id": "001",
//       "user_id": "001",
//       "user_login": "Inna",
//       "date": [
//         "2025-01-21",
//         "2025-01-22",
//         "2025-01-23",
//         "2025-01-24",
//         "2025-01-25"
//       ],
//       "status": "2"

const mongoose = require("mongoose");
const statuses = require("../constants/statuses");

const BookingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  room_id: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
