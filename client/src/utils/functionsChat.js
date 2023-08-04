

const messagePrivate = (userChat, shownUser, socket, event) => {
  event.preventDefault();
  if(Object.keys(shownUser).length === 0) {
    return
  }
  if(message !== '' ){
    const sender_id = user.user_id;
    const receiver_id = shownUser?.UserReceived?.user_id === user.user_id
      ? shownUser.UserSent?.user_id : shownUser?.UserSent?.user_id === user.user_id
      ? shownUser?.UserReceived?.user_id : shownUser?.user_id !== user.user_id && shownUser?.user_id;
    const content = message;
    const userNameReceptor =
      shownUser?.UserReceived?.userName === user.userName
      ? shownUser?.UserSent?.userName : shownUser?.UserSent?.userName === user.userName
      ? shownUser?.UserReceived?.userName : shownUser?.userName !== user.userName
      && shownUser?.userName;
    //const imageReceptor = shownUser?.image;
    const userNameEmisor = userName;
    //const imageEmisor = image;
    // dispatch(setMessages([...messages,
    //   {
    //     emisor, receptor, message, userNameEmisor, userNameReceptor, imageEmisor, imageReceptor, fecha
    //   }
    // ]));
    socket?.emit("private-message",
      {
        sender_id, receiver_id, content, userNameReceptor, userNameEmisor
      });
    setmessage("");
    setPreview(false);
  }
  };

  const dontSendEnter = (event, message) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      message.trim() !== '' && messagePrivate(userChat, shownUser, socket, event);
    }
  };


  export  {
    messagePrivate,
    dontSendEnter,
  }









