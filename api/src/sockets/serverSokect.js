module.exports = (appSocket) => {
  const { Server } = require("socket.io");
  const io = new Server(appSocket, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    //----verificación por consola------------------------
    console.log("cliente conectado: ", socket.id);
    socket.on("disconnect", () => {
      console.log("cliente se ha desconectado: ", socket.id);
    });

    // Canal general abierto a todos para enviar mensajes
    socket.on(
      "message",
      ({ user_id, message, userName, image, fecha, file }) => {
        console.log(
          "Evento recibido: ",
          user_id,
          message,
          userName,
          fecha,
          file
        );
        //console.log("archivo recibido: ", file);

        if (file && file.data instanceof Buffer) {
          socket.broadcast.emit("message", {
            user_id,
            message,
            fecha,
            from: userName,
            image,
            file: {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModifiedDate: file.lastModifiedDate,
              lastModified: file.lastModified,
              data: file.data,
            },
          });
        } else {
          //postMessage(user_id, message)
          socket.broadcast.emit("message", {
            user_id,
            message,
            fecha,
            from: userName,
            image,
          });
        }
      }
    );
  });
};