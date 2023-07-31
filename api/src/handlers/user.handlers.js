const { getUserFeed } = require("../controllers/user.controller");

const profile = async (req, res) => {
  const { user } = req;
  // console.log(user);
  try {
    console.log("user profile, route protected.");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const feed = async (req, res) => {
  const { id, usersType } = req.params;

  if (!["student", "professional", "company"].includes(usersType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const userFeed = await getUserFeed(id, usersType);
    if (userFeed && userFeed.error)
      return res.status(500).json({
        error: userFeed.error,
      });
    res.status(200).json(userFeed);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { profile, feed };
