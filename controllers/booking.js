const Booking = require("../models/Booking");
const STATUS = require("../constants/statuses");
const User = require("../models/User");

//add
async function addBooking(booking) {
  const newBooking = await Booking.create(booking);

  // await User.findByIdAndUpdate(userId, { $push: { bookings, newBooking } });
  await newBooking.populate("room");
  await newBooking.populate("author");

  return newBooking;
}

//delete
function deleteBooking(id) {
  return Booking.deleteOne({ _id: id });
}

//get list
function getBookings() {
  return Booking.find().populate("author").populate("room");
}

//get statuses
function getStatuses() {
  return [
    { id: STATUS.WAITING, name: "Ожидает подтверждения" },
    { id: STATUS.CONFIRMED, name: "Подтверждено" },
    { id: STATUS.CANCELED, name: "Отменено" },
  ];
}

//edit(status)
function updateBooking(id, bookingData) {
  return Booking.findByIdAndUpdate(id, bookingData, {
    returnDocument: "after",
  });
}

//get user bookings
async function getUserBookings(userId) {
  return Booking.find({ author: userId }).populate("author").populate("room");
}

module.exports = {
  addBooking,
  getBookings,
  getStatuses,
  updateBooking,
  deleteBooking,
  getUserBookings,
};
