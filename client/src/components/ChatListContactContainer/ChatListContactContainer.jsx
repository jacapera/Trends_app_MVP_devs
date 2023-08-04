import { selectFilteredUsersChat, setFilteredUsersChat } from "../../Redux/usersChatSlice";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setAllUsersChat } from "../../Redux/usersChatSlice";
import { students } from '../../utils/users'
import {ChatListContact} from "../index";

const ChatListContactContainer = () => {
    const filteredUsers = useSelector(selectFilteredUsersChat);
    const user = useSelector(state => state.usersChat);
    const dispatch = useDispatch();

    const addIds = (students, id) => {
    return students.map((usuario, index) => ({
        ...usuario,
        user_id: id + index
    }))
    }

    useEffect(() => {
      const allUsersIds = addIds(students, 1);
      dispatch(setAllUsersChat(allUsersIds.filter(item => item.user_id !== user.user_id)));
    }, []);
  
  return (
    <div className="flex flex-col w-full h-auto">
      {
        filteredUsers?.map(user=>{
            return(
                <ChatListContact
                    key={user.user_id}
                    id={user.user_id}
                    name={user.name}
                    profile_bio={user.profile_bio}
                    profile_image={user.profile_image}
                />
            )
        })
      }
    </div>
  )
}

export default ChatListContactContainer;