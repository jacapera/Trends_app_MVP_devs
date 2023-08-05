const {
  Chat,
  ChatGroup,
  Message,
  User,
  UserChatGroup,
  MessageChatGroup,
} = require("../db");
const { Op } = require("sequelize");

const postMessage = async (sender_id, receiver_id, content) => {
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
    where: {
      [Op.or]: [{ user1_id: id }, { user2_id: id }],
    },
    include: [
      {
        model: User,
        as: "UserSent", // Nombre de la relación entre Chat y User (remitente del chat)
        attributes: ["username", "id", "profile_image"],
      },
      {
        model: User,
        as: "UserReceived", // Nombre de la relación entre Chat y User (receptor del chat)
        attributes: ["username", "id", "profile_image"],
      },
      {
        model: Message,
        include: [
          {
            model: User,
            attributes: ["username", "id", "profile_image"],
          },
        ],
      },
    ],
  });

  if (!chats || chats.length === 0) {
    return { errror: "No chats found" };
  }

  return chats;
};

const postGroup = async (name) => {
  const group = await ChatGroup.create({ name });

  return group;
};

const getAllGroups = async (userId, userType) => {
  let groups;

  if (userType === "admin") {
    groups = await ChatGroup.findAll({
      include: [
        {
          model: User,
          through: UserChatGroup,
        },
        {
          model: MessageChatGroup,
        },
      ],
    });
  } else {
    groups = await ChatGroup.findAll({
      include: [
        {
          model: User,
          through: {
            attributes: {
              exclude: ["chatGroupId", "userId", "createdAt", "updatedAt"],
            },
          },
          where: { id: userId },
          attributes: ["id", "username", "type"],
        },
        {
          model: MessageChatGroup,
          attributes: { exclude: ["chatGroupId"] },
        },
      ],
    });
  }

  if (!groups || groups.length === 0) {
    return { error: "No groups found" };
  }

  return groups;
};

const putGroup = async (groupId, name) => {
  const group = await ChatGroup.findByPk(groupId);

  if (!group) {
    return { error: "Group not found" };
  }

  group.name = name;
  await group.save();

  return group;
};

const deleteGroup = async (groupId) => {
  const group = await ChatGroup.findByPk(groupId);

  if (!group) {
    return { error: "Group not found" };
  }

  await group.destroy();

  return { message: "Group deleted successfully" };
};

const postUserInGroup = async (groupId, userId, role) => {
  const group = await ChatGroup.findByPk(groupId);
  const user = await User.findByPk(userId);

  if (!group || !user) {
    return { error: "Chat group or user not found" };
  }

  await group.addUser(user, { through: { role } });

  return { message: "User added to chat group successfully" };
};

const patchUserRole = async (groupId, userId, role) => {
  const group = await ChatGroup.findByPk(groupId);
  const user = await User.findByPk(userId);

  if (!group || !user) {
    return { error: "Chat group or user not found" };
  }

  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "That user doesn't belong to the chat group" };
  }

  await userGroup.update({ role });

  return {
    message: "User role updated successfully",
  };
};

const deleteUserFromGroup = async (groupId, userId) => {
  const group = await ChatGroup.findByPk(groupId);
  const user = await User.findByPk(userId);

  if (!group || !user) {
    return { error: "Chat group or user not found" };
  }

  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "That user doesn't belong to the chat group" };
  }

  await group.removeUser(user);

  return {
    message: "User deleted from chat group successfully",
  };
};

const postGroupMessage = async (groupId, content, userId) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return {
      error: "You don't have authorization to send messages to this group",
    };
  }

  const message = await MessageChatGroup.create({ content });
  await message.setUser(userId);
  await message.setChatGroup(groupId);

  return message;
};

const getAllGroupMessages = async (groupId, userId) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return {
      error: "You don't have authorization to see messages from this group",
    };
  }

  const messages = await MessageChatGroup.findAll({
    where: { chatGroupId: groupId },
    include: [{ model: User, attributes: ["username", "type"] }],
    attributes: { exclude: ["userId"] },
  });

  return messages;
};

const deleteGroupMessage = async (groupId, messageId, userId) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return {
      error: "You don't have authorization to delete messages in this group",
    };
  }

  const message = await MessageChatGroup.findOne({
    where: { id: messageId, chatGroupId: groupId },
  });

  if (!message) {
    return { error: "Message not found" };
  }

  await message.destroy();

  return { message: "Message deleted successfully" };
};

const putGroupMessage = async (groupId, messageId, userId, content) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return {
      error: "You don't have authorization to edit messages in this group",
    };
  }

  const message = await MessageChatGroup.findOne({
    where: { id: messageId, chatGroupId: groupId },
  });

  if (!message) {
    return { error: "Message not found" };
  }

  message.content = content;
  await message.save();

  return message;
};

module.exports = {
  postMessage,
  getChatsByUser,
  postGroup,
  putGroup,
  deleteGroup,
  getAllGroups,
  postUserInGroup,
  patchUserRole,
  deleteUserFromGroup,
  postGroupMessage,
  getAllGroupMessages,
  deleteGroupMessage,
  putGroupMessage,
};
