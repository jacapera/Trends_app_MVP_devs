const {Chat, Message, User} = require("../db");
const { Op } = require('sequelize');

const postMessage = async(sender_id, receiver_id, content) => {
    // Buscar un chat existente entre el remitente y el receptor
    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user1_id: sender_id, user2_id: receiver_id },
          { user1_id: receiver_id, user2_id: sender_id },
        ],
      },
    });
    //console.log("chat:", chat)
    // Si no hay un chat existente, creemos uno nuevo
    if (!chat) {
      chat = await Chat.create({
        user1_id: sender_id,
        user2_id: receiver_id,
      });
    }
    // Crear el mensaje
    const message = await Message.create({
      chat_id: chat.chat_id,
      sender_id,
      receiver_id,
      content,
    });

    chat.updated_at = new Date();
    await chat.save();

    return message;
};

const getChatsByUser = async (id) => {
  const chats = await Chat.findAll({
    where:{
      [Op.or]: [
        { user1_id: id },
        { user2_id: id },
      ],
    },
    include: [
      {
        model: User,
        as: "UserSent", // Nombre de la relación entre Chat y User (remitente del chat)
        attributes:["username", "id", "profile_image"]
      },
      {
        model: User,
        as: "UserReceived", // Nombre de la relación entre Chat y User (receptor del chat)
        attributes:["username", "id", "profile_image"]
      },
      {
        model: Message,
        include: [
          {
            model: User,
            attributes:["username", "id", "profile_image"]
          },
        ],
      },
    ],
  });

  if (!chats) {
    return { errror: "No chats found" };
  }

  return chats;
};

module.exports = {
  postMessage,
  getChatsByUser
}