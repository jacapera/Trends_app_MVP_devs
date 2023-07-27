const { Message, User } = require('../../db');

const getMessages = async () => {
  const messages = await Message.findAll({
    include:[{
      model:User,
      attributes: ['full_name', 'userName'],
    }]
  });

  return messages;
};

module.exports = getMessages;