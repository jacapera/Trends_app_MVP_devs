const { Router } = require("express");
const { register, login, logout } = require("../handlers/auth.handlers");
const validateSchema = require("../middlewares/validateInfo");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../schemas/auth.schema");

const authRoutes = Router();

authRoutes.post("/register", validateSchema(registerUserSchema), register);
authRoutes.post("/login", validateSchema(loginUserSchema), login);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
