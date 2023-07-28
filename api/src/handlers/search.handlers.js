const { getUserById, getUsers } = require("../controllers/search.controller");

const searchUserById = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      error: "No ID has been entered",
    });

  try {
    const userById = await getUserById(id);
    if (userById && userById.error)
      return res.status(500).json({
        error: userById.error,
      });
    res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const searchUsers = async (req, res) => {
  const queryParams = { ...req.query };
  const userType = queryParams.type;

  if (!["student", "professional", "company"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const users = await getUsers(queryParams);
    if (users && users.error)
      return res.status(500).json({
        error: users.error,
      });
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { searchUserById, searchUsers };
