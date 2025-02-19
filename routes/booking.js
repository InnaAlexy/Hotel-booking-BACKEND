const express = require("express");
const {
  getBookings,
  getStatuses,
  updateBooking,
  deleteBooking,
  //   addBooking,
  getUserBookings,
} = require("../controllers/booking");
const authenticated = require("../middlewares/authenticated");
const ROLES = require("../constants/roles");
const hasRole = require("../middlewares/hasRole");
const mapBooking = require("../helpers/mapBooking");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const bookings = await getBookings();

    res.send({ error: null, data: bookings.map(mapBooking) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/my", authenticated, async (req, res) => {
  try {
    const bookings = await getUserBookings(req.user.id);

    res.send({ error: null, data: bookings.map(mapBooking) });
  } catch (e) {
    res.send({ error: "Your bookings not found" });
  }
});

router.get(
  "/statuses",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const statuses = await getStatuses();

      res.send({ error: null, data: statuses });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const bookingWithNewStatus = await updateBooking(req.params.id, {
        status: req.body.status,
      });

      res.send({ error: null, data: mapBooking(bookingWithNewStatus) });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteBooking(req.params.id);

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

module.exports = router;
