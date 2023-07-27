const {Router} = require("express")
const postProfessional = require("../controllers/professional.controller");
const professionalRoutes = Router();

professionalRoutes.post("/", async (req, res) => {
  try {
    const { profile, academic, info } = req.body;

    return res.status(200).json(await postProfessional(profile, academic, info));
  } catch (error) {
    return error.statusCode
      ? res.status(error.statusCode).json({ message: error.message })
      : res.status(500).json({ message: error.message });
  }
});

module.exports = professionalRoutes;