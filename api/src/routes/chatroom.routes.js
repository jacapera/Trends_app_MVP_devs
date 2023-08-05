const { Router } = require("express");
const {
  createMessage,
  getListChatsByUser,
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
} = require("../handlers/chatroom.handlers");
const validateId = require("../middlewares/validateId");

const chatroomRoutes = Router();

chatroomRoutes.get("/chat");
chatroomRoutes.get("/chat/:id", validateId, getListChatsByUser);
chatroomRoutes.get("/message");
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

module.exports = chatroomRoutes;
