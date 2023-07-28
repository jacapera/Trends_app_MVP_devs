const { Router } = require("express");
const { profile } = require("../handlers/user.handlers");

const userRoutes = Router();

userRoutes.get("/profile", profile);

module.exports = userRoutes