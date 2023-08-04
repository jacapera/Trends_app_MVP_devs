const validateCompany = async (req, res, next) => {
  const { type: userType } = req.user;

  // if (userType === "admin") {
  //   next();
  // }

  if (userType.toLowerCase() !== "company") {
    return res.status(400).json({ error: "Invalid or not authorized user" });
  }

  next();
};

module.exports = validateCompany;
