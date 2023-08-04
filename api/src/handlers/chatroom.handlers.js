const { postMessage, getChatsByUser } = require("../controllers/chatroom.controller");


const createMessage =  async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body
    const newMessage = await postMessage( sender_id, receiver_id, content)
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log (error)
    return res.status(500).json({message: error.message});
  }

}

const getListChatsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const listChats = await getChatsByUser(id);

    if (listChats?.error) {
      return res.status(400).json({ error: listChats.error });
    }

    return res.status(200).json(listChats);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  createMessage,
  getListChatsByUser,
}