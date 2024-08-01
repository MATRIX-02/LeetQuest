// utils/SecretToken.js
const jwt = require("jsonwebtoken");

const createSecretToken = (userId, expiresIn = '1d') => {
  return jwt.sign({ id: userId }, process.env.TOKEN_KEY, {
    expiresIn: expiresIn,
  });
};

module.exports = { createSecretToken };
