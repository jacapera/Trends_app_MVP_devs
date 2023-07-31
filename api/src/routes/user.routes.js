const { Router } = require("express");
const { profile, feed } = require("../handlers/user.handlers");

const userRoutes = Router();

userRoutes.get("/profile", profile);
userRoutes.get("/feed/:id/:usersType", feed);

module.exports = userRoutes