const {
  Chat,
  ChatGroup,
  Message,
  User,
  UserChatGroup,
  MessageChatGroup,
} = require("../db");
const { Op } = require("sequelize");
const messageFormatter = require("../helpers/messageFormatter");
const chatFormatter = require("../helpers/chatFormatter");
const noReadCounter = require("../helpers/noReadCounter");

const postMessage = async (
  sender_id,
  receiver_id,
  content,
  userId,
  userType
) => {
  // El mensaje se enviará solo si el id del remitente coincide con el del usuario
  // actualmente logueado o si se trata de un usuario tipo admin
  if (sender_id === userId || userType === "admin") {
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
  }
  // Si el id del remitente no corresponde a un usuario
  // registrado y logueado, no tiene permisos para enviar mensajes.
  return { error: "Not authorized" };
};

const getChatsByUser = async (id, userId, userType) => {
  // Solo el propio usuario puede acceder a sus chats
  // o usuarios de tipo admin
  if (id === userId || userType === "admin") {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1_id: id }, { user2_id: id }],
      },
      attributes: {
        exclude: ["user1_id", "user2_id", "created_at", "updated_at"],
      },
      include: [
        {
          model: Message,
          attributes: { exclude: ["chat_id"] },
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
      return { error: "No chats found" };
    }

    return chats;
  }
  // Si los chats no pertenecen al usuario logueado
  // y tampoco es admin, no está autorizado
  return { error: "Not authorized" };
};

const getMessagesByChat = async (chatId, userId, userType) => {
  const chat = await Chat.findByPk(chatId, {
    attributes: {
      exclude: ["chat_id", "user1_id", "user2_id", "created_at", "updated_at"],
    },
    include: [
      {
        model: User,
        as: "UserSent",
        attributes: ["username", "id", "profile_image"],
      },
      {
        model: User,
        as: "UserReceived",
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

  if (!chat) {
    return { error: "Chat not found" };
  }

  if (
    [chat.UserSent.id, chat.UserReceived.id].includes(userId) ||
    userType === "admin"
  ) {
    return chatFormatter(chat);
  }

  return { error: "Not authorized" };
};

const postGroup = async (name, image, userId, userType) => {
  const group = await ChatGroup.create({ ownerId: userId, name, image });

  if (userType !== "admin") {
    try {
      await postUserInGroup(group, userId, "moderator");
    } catch (error) {
      return { error: "Error including user in new group" };
    }
  }

  return group;
};

const putGroup = async (group, name, image) => {
  name && (group.name = name);
  image && (group.image = image);

  await group.save();

  return group;
};

const deleteGroup = async (group, userId, userType) => {
  if (group.ownerId === userId || userType === "admin") {
    await group.destroy();

    return { message: "Group deleted successfully" };
  }
  return { error: "Not authorized" };
};

const getAllGroups = async (userId, userType) => {
  const groups = await ChatGroup.findAll({
    include: [
      {
        model: User,
        through: {
          attributes: {
            exclude: ["chatGroupId", "userId", "createdAt", "updatedAt"],
          },
        },
        attributes: ["id", "username", "type", "profile_image"],
      },
      {
        model: MessageChatGroup,
        attributes: { exclude: ["chatGroupId"] },
      },
    ],
  });

  if (!groups || groups.length === 0) {
    return { error: "No groups found" };
  }

  let outputGroups = [];

  for (const group of groups) {
    const outputGroup = {
      id: group.id,
      ownerId: group.ownerId,
      name: group.name,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      users: group.users,
      messages: group.messageChatGroups,
    };
    outputGroups.push(outputGroup);
  }

  if (userType === "admin") {
    return outputGroups;
  }

  const filteredGroups = outputGroups.filter((group) => {
    return group.users.some((user) => user.id === userId);
  });

  return filteredGroups;
};

const postUserInGroup = async (group, userId, role) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "User not found" };
  }

  await group.addUser(user, { through: { role } });

  return { message: "User added to chat group successfully" };
};

const patchUserRole = async (
  group,
  groupId,
  userId,
  ownerId,
  role,
  currentUserType
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "User not found" };
  }

  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "That user doesn't belong to the chat group" };
  }

  const plainGroup = group.toJSON();
  const userToEdit = plainGroup.users.filter((user) => user.id === userId);

  if (!userToEdit || !userToEdit.length) {
    return res.status(404).json({ error: "User not found in chat group" });
  }

  const userToEditRole = userToEdit[0].userChatGroup.role;

  if (
    (userId === ownerId || userToEditRole === "moderator") &&
    currentUserType !== "admin"
  ) {
    return { error: "Not authorized" };
  }

  await userGroup.update({ role });
  return {
    message: "User role updated successfully",
  };
};

const deleteUserFromGroup = async (
  group,
  groupId,
  userId,
  ownerId,
  currentUserType
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "User not found" };
  }

  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "That user doesn't belong to the chat group" };
  }

  const plainGroup = group.toJSON();
  const userToRemove = plainGroup.users.filter((user) => user.id === userId);

  if (!userToRemove || !userToRemove.length) {
    return res.status(404).json({ error: "User not found in chat group" });
  }

  const userToRemoveRole = userToRemove[0].userChatGroup.role;

  if (
    (userId === ownerId || userToRemoveRole === "moderator") &&
    currentUserType !== "admin"
  ) {
    return { error: "Not authorized" };
  }

  await group.removeUser(user);

  return {
    message: "User deleted from chat group successfully",
  };
};

const postGroupMessage = async (groupId, content, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const message = await MessageChatGroup.create({ content });
    await message.setUser(userId);
    await message.setChatGroup(groupId);

    return message;
  }

  return {
    error: "You don't have authorization to send messages to this group",
  };
};

const getAllGroupMessages = async (groupId, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const messages = await MessageChatGroup.findAll({
      where: { chatGroupId: groupId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "type", "profile_image"],
        },
      ],
      attributes: { exclude: ["userId"] },
    });

    if (!messages.length) {
      return { error: "No messages found" };
    }

    return messageFormatter(messages);
  }
  return {
    error: "You don't have authorization to see messages from this group",
  };
};

const deleteGroupMessage = async (groupId, messageId, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const message = await MessageChatGroup.findOne({
      where: { id: messageId, chatGroupId: groupId },
    });

    if (!message) {
      return { error: "Message not found" };
    }

    await message.destroy();

    return { content: "Este mensaje fue eliminado" };
  }

  return {
    error: "You don't have authorization to delete messages in this group",
  };
};

const putGroupMessage = async (
  groupId,
  messageId,
  userId,
  userType,
  content,
  messageStatus
) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (!userGroup) {
    return { error: "Chat group not found" };
  }

  const message = await MessageChatGroup.findOne({
    where: { id: messageId, chatGroupId: groupId },
    include: [
      {
        model: User,
        attributes: ["id", "username", "type", "profile_image"],
      },
    ],
  });

  if (!message) {
    return { error: "Message not found" };
  }

  if ((userGroup && message.userId === userId) || userType === "admin") {
    message.content = content;

    if (messageStatus && !["sent", "read", "deleted"].includes(messageStatus)) {
      return { error: "Invalid message status" };
    }

    if (messageStatus === "sent") {
      message.messageStatus === message.messageStatus;
    } else {
      message.messageStatus = messageStatus || message.messageStatus;
    }

    if (messageStatus === "deleted") {
      const deleted = await deleteGroupMessage(
        groupId,
        messageId,
        userId,
        userType
      );

      return deleted;
    }

    await message.save();

    return messageFormatter(message);
  }
  return {
    error: "Forbidden",
  };
};

const getUserConversations = async (id, userId, userType) => {
  let conversations = [];

  const userGroups = await getAllGroups(userId, userType);
  const userChats = await getChatsByUser(id, userId, userType);

  if ((!userGroups || userGroups.error) && (!userChats || userChats.error)) {
    return { error: "No conversations found" };
  }

  if (userGroups && !userGroups.error) {
    for (const group of userGroups) {
      const [last_message] = [...group.messages].reverse();
      const countNoRead = noReadCounter(group.messages);

      const conversation = {
        isGroup: true,
        name: group.name,
        image: group?.image || null,
        last_message: last_message.content,
        last_message_date: last_message.createdAt,
        no_read_counter: countNoRead,
      };

      conversations.push(conversation);
    }
  }

  if (userChats && !userChats.error) {
    for (const chat of userChats) {
      const [last_message] = [...chat.messages].reverse();
      const countNoRead = noReadCounter(chat.messages);

      const conversation = {
        isGroup: false,
        name: last_message.user.username,
        image: last_message.user.profile_image,
        last_message: last_message.content,
        last_message_date: last_message.createdAt,
        no_read_counter: countNoRead,
      };

      conversations.push(conversation);
    }
  }

  const orderedConversations = conversations.sort(
    (a, b) => new Date(b.last_message_date) - new Date(a.last_message_date)
  );
  return orderedConversations;
};

module.exports = {
  postMessage,
  getChatsByUser,
  getMessagesByChat,
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
  getUserConversations,
};
