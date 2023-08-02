const { getUserById } = require("../controllers/search.controller");

const validateCompany = async (req, res, next) => {
  const { type: userType} = req.user

  if (userType !== "company") {
    return res.status(400).json({ error: "Invalid or not authorized user" });
  }

  next();
};

module.exports = validateCompany;
