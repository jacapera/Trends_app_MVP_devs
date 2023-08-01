const {Router} = require("express")
const { register, login, logout } = require("../handlers/auth.handlers")

const authRoutes = Router()

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post("/logout", logout)

module.exports = authRoutes