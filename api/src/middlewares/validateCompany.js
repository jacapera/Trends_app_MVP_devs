const validateCompany = async (req, res, next) => {
<<<<<<< HEAD
  const { type: userType} = req.user

  if (userType !== "company") {
=======
  const { type: userType } = req.user;

  if (userType.toLowerCase() !== "company") {
>>>>>>> 036c58092a065ae28621c9e8ad95ad3dabd69405
    return res.status(400).json({ error: "Invalid or not authorized user" });
  }

  next();
};

module.exports = validateCompany;
