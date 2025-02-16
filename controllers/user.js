const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { generate } = require("../helpers/token.js");
const ROLES = require("../constants/roles.js");

///register
async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });
  return { user, token };
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

//get users
function getUsers() {
  return User.find();
}

//get user
function getUser(id) {
  return User.findById(id);
}

//get roles
// function getRoles() {
//   return [
//     { id: ROLES.ADMIN, name: "Admin" },
//     { id: ROLES.GEST, name: "Gest" },
//     { id: ROLES.VIEWER, name: "Viewer" },
//   ];
// }

//delete user
// function deleteUser(id) {
//   return User.deleteOne({ _id: id });
// }

module.exports = {
  register,
  login,
  getUsers,
  getUser,
};
