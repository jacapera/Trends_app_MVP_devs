const { Router } = require("express");
const {
  profile,
  feed,
  editProfile,
  removeProfile,
} = require("../handlers/user.handlers");
const validateId = require("../middlewares/validateId");
const validateProfileOwner = require("../middlewares/validateProfileOwner");
const validateSchema = require("../middlewares/validateInfo");
const { userProfileSchema } = require("../schemas/index.schemas");

const userRoutes = Router();

userRoutes.get("/profile", profile);
userRoutes.put("/:id", validateId, validateProfileOwner, validateSchema(userProfileSchema), editProfile);
userRoutes.delete("/:id", validateId, validateProfileOwner, removeProfile);
userRoutes.get("/feed/:id/:usersType", validateId, validateProfileOwner, feed);

module.exports = userRoutes;
