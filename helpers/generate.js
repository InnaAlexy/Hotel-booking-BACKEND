const jwt = require("jsonwebtoken");
const sign = "test";

module.exports = function (data) {
  return jwt.sign(data, sign, { expiresIn: "30d" });
};
