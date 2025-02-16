const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login, getUsers, getUser } = require("./controllers/user");
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
  getUserBookings,
} = require("./controllers/booking");
const { getRooms, addRoom, getRoom } = require("./controllers/room");
const mapRoom = require("./helpers/mapRoom");
const mapBooking = require("./helpers/mapBooking");

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
  try {
    const data = await getRooms();
    res.send({ error: null, data: data.map(mapRoom) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/rooms/:id", async (req, res) => {
  try {
    const room = await getRoom(req.params.id);

    res.send({ error: null, data: mapRoom(room) });
  } catch (e) {
    res.send({ error: "Room not found" });
  }
});

/////////////////////
app.use(authenticated);
/////////////////////
app.post("/addroom", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const room = await addRoom({
      title: req.body.title,
      img_url: req.body.imgUrl,
      content: req.body.content,
      max_capacity: req.body.maxCapacity,
      price: req.body.price,
    });

    res.send({ error: null, data: room });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();

    res.send({ error: null, data: users.map(mapUser) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    res.send({ error: null, data: mapUser(user) });
  } catch (e) {
    res.send({ error: "User not found" });
  }
});

//////////////BOOKINGS////////////
app.post("/rooms/:id/booking", async (req, res) => {
  try {
    const newBooking = await addBooking({
      room: req.params.id,
      author: req.user.id,
      date: req.body.date,
    });

    res.send({ error: null, data: newBooking });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/bookings", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const bookings = await getBookings();

    res.send({ error: null, data: bookings.map(mapBooking) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.get("/bookings/my", async (req, res) => {
  try {
    const bookings = await getUserBookings(req.user.id);

    res.send({ error: null, data: bookings.map(mapBooking) });
  } catch (e) {
    res.send({ error: "Your bookings not found" });
  }
});

app.get("/bookings/statuses", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const statuses = await getStatuses();

    res.send({ error: null, data: statuses });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.patch("/bookings/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const bookingWithNewStatus = await updateBooking(req.params.id, {
      status: req.body.status,
    });

    res.send({ error: null, data: mapBooking(bookingWithNewStatus) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.delete("/bookings/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deleteBooking(req.params.id);

    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message });
  }
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
