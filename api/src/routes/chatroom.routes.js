const { Router } = require("express");
const { createMessage, getListChatsByUser } = require('../handlers/chatroom.handlers')

const chatroomRoutes = Router();

chatroomRoutes.get('/chat', )
chatroomRoutes.get('/chat/:user_id', getListChatsByUser)
chatroomRoutes.get('/message')
chatroomRoutes.post('/message', createMessage)


module.exports = chatroomRoutes;

