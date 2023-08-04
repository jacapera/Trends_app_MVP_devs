const { NODE_ENV } = require("../../config");
const validateUser = require("../controllers/login.controller");
const registerUser = require("../controllers/register.controller");
const { findAccount } = require("../helpers/findAccount");

const register = async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  try {
    const foundedEmail = await findAccount(newUser.email);
    const foundedUsername = await findAccount(newUser.username);
    if (foundedEmail) throw new Error("this email is already used.");
    if (foundedUsername) throw new Error("this username is already used.");
    const token = await registerUser(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(201).json("User registered successfully.");
    // res.status(201).json(token)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const userData = req.body;
  try {
    const token = await validateUser(userData);
    if (!token) {
      res.cookie("token", "", {
        expires: new Date(0),
      });
      throw new Error("Incorrect credentials.");
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json("Login successfully.");
    // res.status(200).json(token);
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

module.exports = { register, login, logout };
