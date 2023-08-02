module.exports = serverSocket => {
  const { Server } = require('socket.io');
  const io = new Server(serverSocket, {cors:{origin:'*'}});


  const messagesServer = [];

  // Almacenar clientes que se vayan conectando
  let onLineUsers = [];

  const addNewUser = (userName, socketId) => {
    !onLineUsers.some(user => user.userName === userName) &&
      onLineUsers.push({userName, socketId});
  };

  const removeUser = (socketId) => {
    onLineUsers = onLineUsers.filter(user => user.socketId !== socketId);
  };

  const getUser = (userName) => {
    return  onLineUsers.find(user => user.userName === userName);
  };



  // --------- Escuchando cuando se conecte un cliente ----------------
  io.on('connection', socket => {
    //console.log('Cliente conectado: ', socket.id);

    socket.on("newUser", userName => {
      addNewUser(userName, socket.id);
      //const usuario = getUser(userName)
      //console.log("USUARIO: ", usuario);
      //enviarMensajesPendientes(userName, usuario )
      console.log('onLineUsers: ', onLineUsers);
    });
    //socket.emit("actualizar-mensajes", filtered);

    // =============== Chat Individual v2 ================================
    socket.on("private-message",
    ({
      userNameReceptor, emisor, receptor, message, userNameEmisor,
      imageEmisor, imageReceptor, fecha, file
    }) => {
      const receiver = getUser(userNameReceptor);

      messagesServer.push({
        userNameReceptor, emisor, receptor, message, userNameEmisor,
        imageEmisor, imageReceptor, fecha, file
      })

let filtered =[]

    
      const mensajesFiltrados = messagesServer.forEach( item =>{
        if(item.emisor === emisor){
          filtered.push(item)
        }
        if(item.receptor === emisor){
          filtered.push(item)
        }
        //io.to(receiver?.socketId).emit("mensaje-recibido", filtered);
        //socket.emit("mensaje-recibido", filtered);
      })
      const filter = messagesServer.filter( item =>
        (item.emisor === emisor && item.receptor === receptor) ||
        (item.emisor === receptor && item.receptor === emisor)
        )


      //socket.emit("mensaje-recibido", filtered);
 
      //socket.emit("actualizar-mensajes", messages);
      console.log("MESSAGES: ", messagesServer, messagesServer.length);
      //console.log("MESSAGESFILTER: ", filtered, filtered.length,messagesServer.length);
      const sender = getUser(userNameEmisor)

   


      console.log('reciver: ', receiver, message);

      
        io.to(receiver?.socketId).emit("mensaje-recibido", messagesServer);
      console.log('mensaje recibido: ', `emisor: ${userNameEmisor}`, `receptor: ${userNameReceptor}`, message);
    });

    socket.on("disconnect", () => {
      //filtered =[]
      removeUser(socket.id)
    })

  });
}





