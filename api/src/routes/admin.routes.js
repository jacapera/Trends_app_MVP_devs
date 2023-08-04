const { Router } = require("express");
const {
  createAdmin,
  getUsers,
  getGroups,
  getMessages,
} = require("../handlers/admin.handlers");
const adminRoutes = Router();

adminRoutes.post("/create", createAdmin);
adminRoutes.get("/users", getUsers);
adminRoutes.get("/users/groups", getGroups);
adminRoutes.get("/users/messages", getMessages);

module.exports = adminRoutes;
