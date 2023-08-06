const { Router } = require("express");
const {
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
  editGroupMessage,
  userConversations,
} = require("../handlers/chatroom.handlers");
const validateId = require("../middlewares/validateId");
const validateProfileOwner = require("../middlewares/validateProfileOwner");

const chatroomRoutes = Router();

chatroomRoutes.get("/chat");
chatroomRoutes.get("/chat/:id", validateId, getListChatsByUser);
chatroomRoutes.get("/chat/:chatId/messages", messagesByChat);
chatroomRoutes.post("/message", createMessage);

chatroomRoutes.get("/groups", allGroups);
chatroomRoutes.post("/groups", createGroup);
chatroomRoutes.put("/groups/:groupId", editGroup) 
chatroomRoutes.delete("/groups/:groupId", removeGroup);

chatroomRoutes.post("/groups/:groupId/users", addUserToGroup);
chatroomRoutes.patch("/groups/:groupId/users/:userId", editUserRole);
chatroomRoutes.delete("/groups/:groupId/users/:userId", removeUserFromGroup);

chatroomRoutes.get("/groups/:groupId/messages", allGroupMessages);
chatroomRoutes.post("/groups/:groupId/messages", newGroupMessage);
chatroomRoutes.put("/groups/:groupId/messages/:messageId", editGroupMessage);
chatroomRoutes.delete("/groups/:groupId/messages/:messageId", removeGroupMessage);

chatroomRoutes.get("/conversations/:id", validateId, validateProfileOwner, userConversations);

module.exports = chatroomRoutes;
