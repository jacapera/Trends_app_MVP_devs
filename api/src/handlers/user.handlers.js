const { verifyToken } = require("../helpers/jwt");
const { Student, Profile, Academic, Info } = require("../db");

const profile = async (req, res) => {
  const { user } = req.user;
  try {
    console.log("user profile, route protected.");
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { profile };
