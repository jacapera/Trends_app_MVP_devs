const { Router } = require("express");
const { profile, feed } = require("../handlers/user.handlers");
const validateId = require("../middlewares/validateId");

const userRoutes = Router();

userRoutes.get("/profile", profile);
userRoutes.get("/feed/:id/:usersType", validateId, feed);

module.exports = userRoutes