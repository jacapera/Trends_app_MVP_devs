import style from "./Chat.module.css"
import { ChatButton, ChatList, ChatUnselected, ChatMessages } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMinimized} from '../../Redux/chatSlice';
import { selectAllUsersChat, selectShownUser } from '../../Redux/usersChatSlice';
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import axios from 'axios';
import { getMatchedUsers, getUserInfo } from "../../Redux/UsersSlice";
const viteUrl = import.meta.env.VITE_URL;

const Chatx = () => {

  const[socket, setSocket] = useState(null)

  const isMinimized = useSelector(selectIsMinimized);
  const shownUser = useSelector(selectShownUser)
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch();
  //console.log("userChat: ", user)


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
                <ChatMessages socket={socket} />
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Chatx;