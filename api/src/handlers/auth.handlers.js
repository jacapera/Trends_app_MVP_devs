// const { Student, Profile, Academic, Info } = require("../db");
// const user = await Student.findOne({
//   attributes: [],
//   include: [
//     {
//       model: Profile,
//       where: {
//         name: "Juan",
//       },
//     },
//     {
//       model: Info,
//     },
//     {
//       model: Academic,
//     },
//   ],
// });
const validateUser = require("../controllers/login.controller");
const registerUser = require("../controllers/register.controller");
const { verifyToken } = require("../helpers/jwt");

const register = async (req, res) => {
  //FALTAN LAS VALIDACIONES
  const { type, profile, academic, info } = req.body;
  try {
    const token = await registerUser({ type, profile, academic, info });
    res.cookie("token", token)
    res.status(201).json("User registered successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await validateUser({ email, password });
    if (!token) throw new Error("Incorrect credentials.");
    res.cookie("token", token);
    res.status(200).json("Login successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  const cookie = req.cookies.token
  // console.log(cookie);
  try {
    const token = await verifyToken(cookie)
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, logout, profile };
