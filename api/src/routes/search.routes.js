const { Router } = require("express");
const { searchUserById, searchUsers, searchJobs, searchJobById } = require("../handlers/search.handlers");
const searchRoutes = Router();

searchRoutes.get("/user/:id", searchUserById);
searchRoutes.get("/users", searchUsers);
searchRoutes.get("/job/:id", searchJobById);
searchRoutes.get("/jobs", searchJobs);

module.exports = searchRoutes;
