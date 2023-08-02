const { getUserById } = require("../controllers/search.controller");

const validateProfileOwner = async (req, res, next) => {
  const { id: UserId } = req.user;
  const { id: ProfileId } = req.params;
  const profileToEdit = await getUserById(ProfileId);
console.log(req.user)
  if (!profileToEdit)
    return res.status(400).json({ error: "User not found" });

  if (profileToEdit.error)
    return res.status(500).json({
      error: profileToEdit.error,
    });

  if (profileToEdit.id !== UserId) {
    return res.status(400).json({ error: "Not authorized" });
  }

  req.profile = profileToEdit;

  next();
};

module.exports = validateProfileOwner;
