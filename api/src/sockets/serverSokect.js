const { postMessage } = require("../controllers/chatroom.controllers");

module.exports = (serverSocket) => {
  const { Server } = require("socket.io");
  const io = new Server(serverSocket, { cors: { origin: "*" } });

  // Almacenar clientes que se vayan conectando
  let onLineUsers = [];

  const addNewUser = (username, socketId) => {
    !onLineUsers.some((user) => user.username === username) &&
      onLineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (username) => {
    return onLineUsers.find((user) => user.username === username);
  };

  // --------- Escuchando cuando se conecte un cliente ----------------
  io.on("connection", (socket) => {
    //console.log('Cliente conectado: ', socket.id);

    socket.on("newUser", (username) => {
      addNewUser(username, socket.id);
      console.log("onLineUsers: ", onLineUsers);
    });

    // =============== Chat Individual v2 ================================
    socket.on(
      "private-message",
      ({
        sender_id,
        receiver_id,
        content,
        file,
        userNameReceptor,
        userNameEmisor,
      }) => {
        postMessage(sender_id, receiver_id, content);
        const receiver = getUser(userNameReceptor);
        const sender = getUser(userNameEmisor);
        let listChats = [];
        getChatsByUser(receiver_id)
          .then((response) => {
            io.to(receiver?.socketId).emit("mensaje-recibido", response);
            io.to(sender?.socketId).emit("mensaje-recibido", response);
            console.log("mensaje enviado");
          })
          .catch((error) => console.log(error));

        console.log("reciver: ", receiver, message);
        console.log(
          "mensaje recibido: ",
          `emisor: ${usernameEmisor}`,
          `receptor: ${usernameReceptor}`,
          message
        );
      }
    );

    socket.on("disconnect", () => {
      //filtered =[]
      removeUser(socket.id);
    });
  });
};
