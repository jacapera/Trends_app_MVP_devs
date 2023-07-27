const {Router} = require("express")
const postStudent = require("../controllers/student.controller");
const studentRoutes = Router();

studentRoutes.post("/", async (req, res) => {
  try {
    const { profile, academic, info } = req.body;

    return res.status(200).json(await postStudent(profile, academic, info));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({ message: error.message })
      : res.status(500).json({ message: error.message });
  }
});

module.exports = studentRoutes;