const { Router } = require("express");

/*

const { profile, feed, editProfile } = require("../handlers/user.handlers");
const validateId = require("../middlewares/validateId");
const validateProfileOwner = require("../middlewares/validateProfileOwner");
*/

const { profile, feed, updatePassword } = require("../handlers/user.handlers");


const userRoutes = Router();

userRoutes.put("/profile/password", updatePassword);
userRoutes.get("/profile", profile);
userRoutes.put("/:id", validateId, validateProfileOwner, editProfile);
userRoutes.get("/feed/:id/:usersType", validateId, validateProfileOwner, feed);

module.exports = userRoutes;
