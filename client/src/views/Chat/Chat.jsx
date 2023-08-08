import style from "./Chat.module.css"
import { ChatList, ChatUnselected, ChatMessages } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { getMatchedUsers, getUserInfo, selectUserProfile } from "../../Redux/UsersSlice";
import { selectIsMinimized, selectSelectedUser } from "../../Redux/chatSlice";
const viteUrl = import.meta.env.VITE_URL;

const Chat = () => {

  const[socket, setSocket] = useState(null)

  const isMinimized = useSelector(selectIsMinimized);
  const selectedUser = useSelector(selectSelectedUser);
  const user = useSelector(selectUserProfile)
  const dispatch = useDispatch();


//Conexión de Socket al servidor
  useEffect(() => {
    const newSocket = io(viteUrl);
    newSocket.on("connect", () => {
      setSocket(newSocket)});
    return () => {
      socket && newSocket.disconnect();
    };
  },[]);


// Envia username para agregar usuario conectados al servidor
  useEffect(() => {
    socket?.emit("newUser", user.username);
  },[socket, user]);
  
  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getMatchedUsers())
  },[]);



  return (
    <div className={isMinimized ? style.hidden : style.mainContainer}>
      <ChatList/>
      {
        !selectedUser.id ?
        (
          <ChatUnselected/>
        ) : (
          <ChatMessages socket={socket} />
        )
      }
    </div>
  )
}

export default Chat;