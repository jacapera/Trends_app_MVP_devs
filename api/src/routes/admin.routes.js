const { Router } = require("express");
const adminRoutes = Router();

adminRoutes.post("/create");
adminRoutes.get("/users");
adminRoutes.get("/users/groups");
adminRoutes.get("/users/messages");

module.exports = adminRoutes;
