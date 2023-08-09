const { getAllGroups } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    const foundGroups = await getAllGroups(userId, userType);

    if (foundGroups?.error) {
      return res.status(400).json({ error: foundGroups.error });
    }

    res.status(200).json(foundGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
