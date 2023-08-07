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

    const handleUserSelection = (user) => {
      dispatch(setSelectedUser(user))
    }

    useEffect(() => {
      dispatch(setAllUsersChat(allUsers))
      console.log("selectedUser: ", selectedUser)
    }, [selectedUser]);

    useEffect(()=>{
      if(Object.keys(user).length > 0){
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
        listChats?.map((chat, index)=>{
            return(
              <ChatListContact
                key={index}
                chat_id={chat.chat_id}
                id={(user.id !== chat.UserReceived.id) ? chat.UserReceived.id : chat.UserSent.id }
                name={(user.id !== chat.UserReceived.id) ? chat.UserReceived.username : chat.UserSent.username}
                profile_bio={chat.messages[0]?.content}
                profile_image={(user.id !== chat.UserReceived.id) ? chat.UserReceived.profile_image : chat.UserSent.profile_image}
              />
            )
        })
      }
    </div>
  )
}

export default ChatListContactContainer;