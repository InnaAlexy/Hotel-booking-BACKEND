const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login, getUsers } = require("./controllers/user");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const ROLES = require("./constants/roles");
const hasRole = require("./middlewares/hasRole");
const {
  getBookings,
  getStatuses,
  updateBooking,
  deleteBooking,
  addBooking,
} = require("./controllers/booking");
const { getRooms, addRoom, getRoom } = require("./controllers/room");

const port = 3002;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unckown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unckown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

//////rooms
app.get("/rooms", async (req, res) => {
  const data = await getRooms();

  res.send({ data: data });
});

app.get("/rooms/:id", async (req, res) => {
  const room = await getRoom(req.params.id);

  res.send({ data: room });
});

/////////////////////
app.use(authenticated);
/////////////////////
app.post("/addroom", hasRole([ROLES.ADMIN]), async (req, res) => {
  const room = await addRoom({
    title: req.body.title,
    img_url: req.body.imgUrl,
    content: req.body.content,
    max_capacity: req.body.maxCapacity,
    price: req.body.price,
  });

  res.send({ data: room });
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

//////////////BOOKINGS////////////
// app.post("/bookings", hasRole([ROLES.ADMIN, ROLES.GEST]), async (req, res) => {
//   const room = await addBooking({
//     room: req.body.title,
//     author: req.body.imgUrl,
//     date: req.body.content,

//   });

//   res.send({ data: room });
// });

app.get("/bookings", hasRole([ROLES.ADMIN]), async (req, res) => {
  const bookings = await getBookings();

  res.send({ data: bookings });
});

app.get("/bookings/statuses", hasRole([ROLES.ADMIN]), async (req, res) => {
  const statuses = await getStatuses();

  res.send({ data: statuses });
});

app.patch("/bookings/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const bookingWithNewStatus = await updateBooking(req.params.id, {
    status: req.body.status,
  });

  res.send({ data: bookingWithNewStatus });
});

app.delete("/bookings/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteBooking(req.params.id);

  res.send({ error: null });
});

////////////////////

mongoose
  .connect(
    "mongodb+srv://lifeinnaalex:332257315Aa@cluster0.nglar.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
