const {Router} = require("express")
const { register, login, logout } = require("../handlers/auth.handlers")

const authRoutes = Router()

authRoutes.post("/auth/register", register)
authRoutes.post("/auth/login", login)
authRoutes.post("/auth/logout", logout)

module.exports = authRoutes