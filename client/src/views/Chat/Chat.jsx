import style from "./Chat.module.css"
import { ChatButton, ChatList, ChatUnselected, ChatMessages } from '../../components';
import { useSelector } from 'react-redux';
import { selectIsMinimized} from '../../Redux/chatSlice';
import { selectAllUsersChat, selectShownUser } from '../../Redux/usersChatSlice';
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import axios from 'axios';
import { messagePrivate } from '../../utils/functionsChat';
const viteUrl = import.meta.env.VITE_URL;

const Chatx = () => {

  const[socket, setSocket] = useState(null)

  const isMinimized = useSelector(selectIsMinimized);
  const shownUser = useSelector(selectShownUser)
  const userChat = useSelector(state => state.usersChat)
  const token = useSelector(state => state.usersChat.token);
  console.log("userChat: ", userChat)


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
    socket?.emit("newUser", userChat.username);
  },[socket, userChat]);
  
  useEffect(() => {
    axios.get(`${viteUrl}/api/v1/user/`)
  },[]);



  return (
    <div>
      {
        isMinimized ? (
          <ChatButton/>
        ) : (
          <div className={style.mainContainer}>
            <ChatList/>
            {
              !shownUser ?
              (
                <ChatUnselected/>
              ) : (
                <ChatMessages token={token}/>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Chatx;