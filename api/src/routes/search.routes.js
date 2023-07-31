const { Router } = require("express");
const { searchUserById, searchUsers, searchJobs } = require("../handlers/search.handlers");
const searchRoutes = Router();

searchRoutes.get("/user/:id", searchUserById);
searchRoutes.get("/users", searchUsers);
searchRoutes.get("/jobs", searchJobs);

module.exports = searchRoutes;
