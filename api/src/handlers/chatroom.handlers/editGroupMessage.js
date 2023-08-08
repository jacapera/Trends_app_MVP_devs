const { putGroupMessage } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;
    const { content, messageStatus } = req.body;
    const { id: userId, type: userType } = req.user;

    const updatedGroupMessage = await putGroupMessage(
      groupId,
      messageId,
      userId,
      userType,
      content,
      messageStatus
    );

    if (updatedGroupMessage?.error) {
      return res.status(400).json({ error: updatedGroupMessage.error });
    }

    res.status(200).json(updatedGroupMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
