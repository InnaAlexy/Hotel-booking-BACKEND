const Booking = require("../models/Booking");
const STATUS = require("../constants/statuses");

//add
function addBooking(booking) {
  return Booking.create(booking);
}

//delete
function deleteBooking(id) {
  return Booking.deleteOne({ _id: id });
}

//get list
function getBookings() {
  return Booking.find();
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

module.exports = {
  addBooking,
  getBookings,
  getStatuses,
  updateBooking,
  deleteBooking,
};
