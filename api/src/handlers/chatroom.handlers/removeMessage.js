const {
  deleteMessage,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { id: userId, type: userType } = req.user;

    const removedMessage = await deleteMessage(
      chatId,
      messageId,
      userId,
      userType
    );

    if (removedMessage?.error) {
      return res.status(400).json({ error: removedMessage.error });
    }

    return res.status(200).json(removedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
