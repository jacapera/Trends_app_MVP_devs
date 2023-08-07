const {
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
} = require("../controllers/chatroom.controllers");

const createMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body;
    const { id: userId, type: userType } = req.user;

    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newMessage = await postMessage(
      sender_id,
      receiver_id,
      content,
      userId,
      userType
    );

    if (newMessage?.error) {
      return res.status(400).json({ error: newMessage.error });
    }
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getListChatsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, type: userType } = req.user;

    const listChats = await getChatsByUser(id, userId, userType);

    if (listChats?.error) {
      return res.status(400).json({ error: listChats.error });
    }

    return res.status(200).json(listChats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const messagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { id: userId, type: userType } = req.user;

    const foundMessages = await getMessagesByChat(chatId, userId, userType);

    if (foundMessages?.error) {
      return res.status(500).json({ error: foundMessages.error });
    }

    return res.status(200).json(foundMessages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id: userId, type: userType } = req.user;
    const createdGroup = await postGroup(name, image, userId, userType);

    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({ error: "Error creating chat group" });
  }
};

const editGroup = async (req, res) => {
  try {
    const group = req.group;
    const { name, image } = req.body;

    if (!name && !image) {
      return res.status(400).json({
        error: "Insufficient data: a name or an image must be provided",
      });
    }

    const updatedGroup = await putGroup(group, name, image);

    if (updatedGroup?.error) {
      return res.status(404).json({ error: updatedGroup.error });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: "Error updating group" });
  }
};

const removeGroup = async (req, res) => {
  try {
    const group = req.group;
    const { id: userId, type: userType } = req.user;

    const removedGroup = await deleteGroup(group, userId, userType);

    if (removedGroup?.error) {
      return res.status(400).json({ error: removedGroup.error });
    }

    res.status(200).json(removedGroup);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the group" });
  }
};

const allGroups = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    const foundGroups = await getAllGroups(userId, userType);

    if (foundGroups?.error) {
      return res.status(400).json({ error: foundGroups.error });
    }

    res.status(200).json(foundGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const group = req.group;

    const addedUser = await postUserInGroup(group, userId, role);

    if (addedUser?.error) {
      return res.status(400).json({ error: addedUser.error });
    }

    res.status(200).json(addedUser);
  } catch (error) {
    res.status(500).json({ error: "Error adding user to chat group" });
  }
};

const editUserRole = async (req, res) => {
  try {
    const group = req.group;
    const { groupId, userId } = req.params;
    const ownerId = req.group.ownerId;
    const { role } = req.body;
    const { type: currentUserType } = req.user;

    const editedUserRole = await patchUserRole(
      group,
      groupId,
      userId,
      ownerId,
      role,
      currentUserType
    );

    if (editedUserRole?.error) {
      return res.status(400).json({ error: editedUserRole.error });
    }

    res.status(200).json(editedUserRole);
  } catch (error) {
    res.status(500).json({
      error: "Error updating user role",
    });
  }
};

const removeUserFromGroup = async (req, res) => {
  try {
    const group = req.group;
    const { groupId, userId } = req.params;
    const ownerId = req.group.ownerId;
    const { type: currentUserType } = req.user;

    const removedUserFromGroup = await deleteUserFromGroup(group, groupId, userId, ownerId, currentUserType);

    if (removedUserFromGroup?.error) {
      return res.status(404).json({ error: removedUserFromGroup.error });
    }

    res.status(200).json(removedUserFromGroup);
  } catch (error) {
    res.status(500).json({ error: "Error removing user from group" });
  }
};

const newGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { content } = req.body;
    const { id: userId, type: userType } = req.user;

    const createdGroupMessage = await postGroupMessage(
      groupId,
      content,
      userId,
      userType
    );

    if (createdGroupMessage?.error) {
      return res.status(403).json({ error: createdGroupMessage.error });
    }

    res.status(201).json(createdGroupMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { id: userId, type: userType } = req.user;

    const foundGroupMessages = await getAllGroupMessages(
      groupId,
      userId,
      userType
    );

    if (foundGroupMessages?.error) {
      return res.status(403).json({ error: foundGroupMessages.error });
    }

    res.status(200).json(foundGroupMessages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obtaining messages from the chat group" });
  }
};

const removeGroupMessage = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;
    const { id: userId, type: userType } = req.user;

    const removedGroupMessage = await deleteGroupMessage(
      groupId,
      messageId,
      userId,
      userType
    );

    if (removeGroupMessage?.error) {
      return res.status(400).json({ error: removeGroupMessage.error });
    }

    return res.status(200).json(removedGroupMessage);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the message" });
  }
};

const editGroupMessage = async (req, res) => {
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

const userConversations = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, type: userType, username, name, profile_image } = req.user;

    const allConversations = await getUserConversations(id, userId, userType, username, name, profile_image);

    if (allConversations?.error) {
      return res.status(400).json({ error: allConversations.error });
    }

    return res.status(200).json(allConversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getListChatsByUser,
  messagesByChat,
  createGroup,
  editGroup,
  removeGroup,
  allGroups,
  addUserToGroup,
  editUserRole,
  removeUserFromGroup,
  newGroupMessage,
  allGroupMessages,
  removeGroupMessage,
  deleteGroupMessage,
  editGroupMessage,
  userConversations,
};
