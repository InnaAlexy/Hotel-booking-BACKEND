const express = require("express");
const { getUsers, getUser } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");
const authenticated = require("../middlewares/authenticated");
const ROLES = require("../constants/roles");
const hasRole = require("../middlewares/hasRole");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();

    res.send({ error: null, data: users.map(mapUser) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    res.send({ error: null, data: mapUser(user) });
  } catch (e) {
    res.send({ error: "User not found" });
  }
});

module.exports = router;
