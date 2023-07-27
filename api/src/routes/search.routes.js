const { Router } = require("express");
const { searchUserById, searchUsers } = require("../handlers/search.handlers");
const searchRoutes = Router();

searchRoutes.get("/user/:id", searchUserById);
searchRoutes.get("/users", searchUsers);

module.exports = searchRoutes;
