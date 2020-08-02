require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = {
    userID: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, jwtSecret, options);
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 12);
}

module.exports = { generateToken, hashPassword };
