const { Message, Chat } = require('../../db');

const postMessage = async(user_id, content) => {

  // const findChat = await Chat.findOne({
  //   where: {}
  // })
  const newChat = await Chat.create();
  const newMessage = await Message.create({
    content,
    user_id,
  })

  return newMessage;
};

module.exports = postMessage;