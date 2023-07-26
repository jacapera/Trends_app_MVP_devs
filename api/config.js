require("dotenv").config();

const {
  SV_HOST,
  SV_PORT,
  JWT_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  SV_HOST,
  SV_PORT,
  JWT_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
};
