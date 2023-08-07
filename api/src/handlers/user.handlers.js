const {
  getUserFeed,
  getUserProfile,
  putUserProfile,
  deleteUserProfile,
  changeUserPassword,
} = require("../controllers/user.controllers");

const profile = async (req, res) => {
  const { user } = req;
  try {
    console.log("user profile, route protected.");
    const foundedUser = await getUserProfile(user);
    if (!foundedUser) throw new Error("User not found.");
    res.status(200).json(foundedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { newPassword, currentPassword } = req.body;
  try {
    const result = await changeUserPassword(id, newPassword, currentPassword);
    if (!result) throw new Error("Could not update password.");
    res.status(200).json("Password updated successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editProfile = async (req, res) => {
  const profileData = req.body;
  const { profile } = req;

  try {
    const editedProfile = await putUserProfile(profile, profileData);

    if (!editedProfile) {
      return res.status(500).json({ error: "The profile couldn't be updated" });
    }

    return res.status(201).json(editedProfile);
  } catch (error) {
    return res.status(500).json({ error: "Error updating the database" });
  }
};

const removeProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const removedProfile = await deleteUserProfile(id);

    if (removedProfile === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "The profile couldn't be deleted" });
  }
};

const feed = async (req, res) => {
  const { id, usersType } = req.params;
  const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
  const perPage = parseInt(req.query.perPage) || 10; // Cantidad por página, por defecto 10

  if (!["student", "professional", "company"].includes(usersType.toLowerCase())) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const userFeed = await getUserFeed(id, usersType, page, perPage);

    if (!userFeed) {
      return res.status(500).json({
        error: "Error loading the feed"
      })
    }

    if (userFeed.error)
      return res.status(500).json({
        error: userFeed.error,
      });
      
    res.status(200).json(userFeed);
  } catch (error) {
    return res.status(500).json({
      error: "Error retrieving the feed data",
    });
  }
};

module.exports = { profile, feed, updatePassword, editProfile, removeProfile };
