import style from "./Chat.module.css"
import { ChatButton, ChatList, ChatUnselected, ChatMessages } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMinimized, selectSelectedUser} from '../../Redux/chatSlice';
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { getMatchedUsers, getUserInfo, selectUserProfile } from "../../Redux/UsersSlice";
const viteUrl = import.meta.env.VITE_URL;

const Chatx = () => {

  const[socket, setSocket] = useState(null)

  const selectedUser = useSelector(selectSelectedUser);
  const user = useSelector(state => state.users.user)
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
    <div className={style.mainContainer}>
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

export default Chatx;