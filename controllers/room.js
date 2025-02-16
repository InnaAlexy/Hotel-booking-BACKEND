const Room = require("../models/Room");

//get list
function getRooms() {
  return Room.find();
}

//get item
function getRoom(id) {
  return Room.findById(id);
}

//add
function addRoom(room) {
  return Room.create(room);
}

module.exports = {
  addRoom,
  getRoom,
  getRooms,
};
