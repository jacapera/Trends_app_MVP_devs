const express = require('express');
const usersRouter = require('./usersRouter');
const messagesRouter = require('./messagesRouter');
const groupsRouter = require('./groupsRouter');

function routerApi(server) {
  const router = express.Router();
  //Ruta padre con versión
  server.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/messages", messagesRouter);
  router.use("/groups", groupsRouter);
};

module.exports = routerApi;