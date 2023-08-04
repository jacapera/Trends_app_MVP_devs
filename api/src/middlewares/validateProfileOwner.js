const { getUserById } = require("../controllers/search.controller");

const validateProfileOwner = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: profileId } = req.params;
  // const { type: userType } = req.user;
  
  const profileToEdit = await getUserById(profileId);

  if (!profileToEdit)
    return res.status(400).json({ error: "User not found" });

  // if (userType === "admin") {
  //   next();
  // }

  if (profileToEdit.id !== userId) {
    return res.status(400).json({ error: "Not authorized" });
  }

  req.profile = profileToEdit;

  next();
};

module.exports = validateProfileOwner;
