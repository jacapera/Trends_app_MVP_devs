const { Router } = require("express");
const { profile } = require("../handlers/user.handlers");

const userRoutes = Router();

userRoutes.get("/user/profile", profile);

module.exports = userRoutes