const {Router} = require("express")
const postUserTest = require("../controllers/userTest.controller");
const userTestRoutes = Router();

userTestRoutes.post("/", async (req, res) => {
  try {
    return res.status(200).json(await postUserTest(req.body));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({ message: error.message })
      : res.status(500).json({ message: error.message });
  }
});

module.exports = userTestRoutes;