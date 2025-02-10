const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const generate = require("../helpers/generate.js");

///register
async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  //   const token = generate({ id: user.id }); //await?
  return user;
}

//login
async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new error("User is not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }
  const token = generate({ id: user.id });
  return { user, token };
}

//logout

//get bookings

module.exports = {
  register,
  login,
};
