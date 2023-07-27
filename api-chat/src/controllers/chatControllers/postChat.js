const { Chat, Message, User } = require('../../db');

const postChat = async (user_id) => {
  const newChat = await Chat.create();
  return newChat;
}

module.exports = postChat;