import { selectFilteredUsersChat, setFilteredUsersChat, setSelectedUser } from "../../Redux/usersChatSlice";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setAllUsersChat } from "../../Redux/usersChatSlice";
import {ChatListContact} from "../index";
import { getMatchedUsers, selectAllUsers } from "../../Redux/UsersSlice";
import style from './temporal.module.css'

const ChatListContactContainer = () => {
    const filteredUsers = useSelector(selectFilteredUsersChat);
    const allUsers = useSelector(selectAllUsers)
    const user = useSelector(state => state.users.user);
    const selectedUser = useSelector(state => state.usersChat.selectedUser)

    const dispatch = useDispatch();

    //console.log("userFilter: ", filteredUsers)

    const handleUserSelection = (user) => {
      dispatch(setSelectedUser(user))
    }

    useEffect(() => {
      dispatch(setAllUsersChat(allUsers))
      console.log("selectedUser: ", selectedUser)
    }, [selectedUser]);

  return (
    <div className="flex flex-col w-full h-auto">
      {
        allUsers?.map((user, index)=>{
            return(
              <div className={style.containerUsers} key={index}
                onClick={()=>handleUserSelection(user)}
              >
                <div className={style.containerImgName}>
                  <img className={style.imgUser} src={user.profile_image} alt="" />
                  <span>{user.name}</span>
                </div>
              </div>
                // <ChatListContact
                //     key={index}
                //     id={user.id}
                //     name={user.name}
                //     profile_bio={user.profile_bio}
                //     profile_image={user.profile_image}
                // />
            )
        })
      }
    </div>
  )
}

export default ChatListContactContainer;