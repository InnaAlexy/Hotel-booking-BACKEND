const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

// const { register, login, getUsers, getUser } = require("./controllers/user");
// const mapUser = require("./helpers/mapUser");
// const authenticated = require("./middlewares/authenticated");
// const ROLES = require("./constants/roles");
// const hasRole = require("./middlewares/hasRole");
// const {
//   getBookings,
//   getStatuses,
//   updateBooking,
//   deleteBooking,
//   addBooking,
//   getUserBookings,
// } = require("./controllers/booking");
// const { getRooms, addRoom, getRoom } = require("./controllers/room");
// const mapRoom = require("./helpers/mapRoom");
// const mapBooking = require("./helpers/mapBooking");

const port = 3002;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

mongoose
  .connect(
    "mongodb+srv://lifeinnaalex:332257315Aa@cluster0.nglar.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
