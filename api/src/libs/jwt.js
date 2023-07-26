const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config");

const createToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, { expiresIn: "12h" }, (error, token) => {
      if (error) reject({ ...error, message: "Could not create token." });
      resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (error, decoded) => {
      if (error)
        reject({ ...error, message: "Invalid token. Authorization denied." });
      resolve(decoded);
    });
  });
};

module.exports = { createToken, verifyToken };
