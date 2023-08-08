const { postGroup } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id: userId, type: userType } = req.user;
    const createdGroup = await postGroup(name, image, userId, userType);

    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({ error: "Error creating chat group" });
  }
};
