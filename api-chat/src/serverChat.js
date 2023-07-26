const { postMessage } = require('./controllers');

module.exports = serverSocket => {
  const { Server } = require('socket.io');
  const io = new Server(serverSocket, {cors:{origin:'*'}});



  // ===========================================================
  let onLineUsers = [];
  const addNewUser = (userName, socketId) => {
    !onLineUsers.some(user =>
      user.userName === userName && onLineUsers.push({userName, socketId})
    );
  };
  const removeUser = (socketId) => {
    onLineUsers = onLineUsers.filter(user => user.socketId !== socketId);
  };
  const getUser = (userName) => {
    return onLineUsers.find(user => user.userName === userName);
  };
  // ===========================================================


  // Escuchando cuando se conecte un cliente
  // --------------------------------------------------
  io.on('connection', socket => {
    // ===================================
    // socket.on("newUser", userName => {
    //   addNewUser(userName, socket.id);
    // });
    // socket.on("disconnect", () =>{
    //   removeUser(socket.id);
    // });
    // ===================================

    // Ver en consola cuando se conecte un cliente
    //console.log('Cliente conectado: ', socket.id);

    // Chat Individual
    // ----------------------------------------------------------------------------
    socket.on("private-message", ({ user_id, message }) => {
      console.log("user conected: ", socket.id, user_id)

      io.to(user_id).emit("private-message", {
        user_id: socket.id,
        message,
      })
    });

    // Escuchando evento del cliente y enviando a todos CHAT GRUPAL
    // ----------------------------------------------------------------------------
    socket.on("message", ({ user_id, message, userName, image, fecha, file }) => {
      console.log("Evento recibido: ", user_id, message, userName, fecha, file);
      //console.log("archivo recibido: ", file);

      if(file && file.data instanceof Buffer){
        socket.broadcast.emit("message", {
          message,
          fecha,
          from: userName,
          image,
          file:{
            name: file.name,
            size: file.size,
            type: file.type,
            lastModifiedDate: file.lastModifiedDate,
            lastModified: file.lastModified,
            data: file.data
          },
        });
      } else {
        postMessage(user_id, message)
        socket.broadcast.emit("message", {
          message,
          fecha,
          from: userName,
          image,
        });
      }
    });
  });
}

