const { getUserById } = require("../controllers/search.controller");

const validateCompany = async (req, res, next) => {
  const { id: UserId } = req.user;
  const currentUser = await getUserById(UserId);
  const currentUserType = currentUser?.dataValues?.type;

  if (!currentUserType) return res.status(400).json({ error: "User not found" });

  if (currentUserType !== "company") {
    return res.status(400).json({ error: "Invalid or not authorized user" });
  }

  next();
};

module.exports = validateCompany;
