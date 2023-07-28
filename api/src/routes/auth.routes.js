const { Router } = require("express");
const {
	register,
	login,
	logout,
	profile,
} = require("../handlers/auth.handlers");

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/auth/profile", profile);

module.exports = authRoutes;
