import { selectFilteredUsersChat, setFilteredUsersChat, setSelectedUser } from "../../Redux/usersChatSlice";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setAllUsersChat } from "../../Redux/usersChatSlice";
import {ChatListContact} from "../index";
import { getMatchedUsers, selectAllUsers } from "../../Redux/UsersSlice";
import style from './temporal.module.css'
import axios from 'axios';
import { setListChats } from "../../Redux/chatSlice";
const viteUrl = import.meta.env.VITE_URL;

const ChatListContactContainer = () => {
    const filteredUsers = useSelector(selectFilteredUsersChat);
    const allUsers = useSelector(selectAllUsers)
    const user = useSelector(state => state.users.user);
    const selectedUser = useSelector(state => state.usersChat.selectedUser)
    const listChats = useSelector(state => state.chat.listChats)

    const dispatch = useDispatch();

    //console.log("userFilter: ", filteredUsers)

    const handleUserSelection = (user) => {
      dispatch(setSelectedUser(user))
    }

    useEffect(() => {
      dispatch(setAllUsersChat(allUsers))
      console.log("selectedUser: ", selectedUser)
    }, [selectedUser]);

    useEffect(()=>{
      if(user){
        console.log("user: ", user)
        axios.get(`${viteUrl}/api/v1/chatroom/chat/${user?.id}`, { withCredentials:"include"})
          .then(({data}) => {
            console.log(data)
            dispatch(setListChats(data))
          }).catch(error => console.log(error));
      }
    },[user])

  return (
    <div className="flex flex-col w-full h-auto">
      {
        listChats?.map((user, index)=>{
            return(
              // <div className={style.containerUsers} key={index}
              //   onClick={()=>handleUserSelection(user)}
              // >
              //   <div className={style.containerImgName}>
              //     <img className={style.imgUser} src={user.UserReceived.profile_image} alt="" />
              //     <div>
              //       <span>{user.UserReceived.username}</span>
              //       <span>{user?.messages[0]?.content}</span>
              //     </div>
              //   </div>
              // </div>
                <ChatListContact
                    key={index}
                    id={user.UserReceived.id}
                    name={user.UserReceived.username}
                    profile_bio={user?.messages[user?.messages.length-1]?.content}
                    profile_image={user.UserReceived.profile_image}
                />
            )
        })
      }
    </div>
  )
}

export default ChatListContactContainer;