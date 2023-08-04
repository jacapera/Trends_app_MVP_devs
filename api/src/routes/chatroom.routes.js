const { Router } = require("express");
const { createMessage, getListChatsByUser } = require('../handlers/chatroom.handlers');
const validateId = require("../middlewares/validateId");

const chatroomRoutes = Router();

chatroomRoutes.get('/chat', )
chatroomRoutes.get('/chat/:id', validateId, getListChatsByUser)
chatroomRoutes.get('/message')
chatroomRoutes.post('/message', createMessage)


module.exports = chatroomRoutes;

