const { Router } = require("express");
const { profile, feed, updatePassword } = require("../handlers/user.handlers");

const userRoutes = Router();

userRoutes.put("/profile/password", updatePassword);
userRoutes.get("/profile", profile);
userRoutes.get("/feed/:id/:usersType", feed);

module.exports = userRoutes;
