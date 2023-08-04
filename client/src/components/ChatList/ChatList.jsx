import style from "./ChatList.module.css"
import {ChatListContactContainer, ChatNewChat} from "../index"
import {BsThreeDotsVertical, BsFillPersonPlusFill} from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredUsersChat } from "../../Redux/usersChatSlice";
import axios from 'axios'
const viteUrl = import.meta.env.VITE_URL;


const ChatList = () => {
  const dispatch = useDispatch();
  const usersChat = useSelector(state => state.usersChat)

  useEffect(()=> {
    dispatch(setFilteredUsersChat(""))
  }, [])

  const [newChat, setNewChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  const handleNewChat = () =>{
    setNewChat(!newChat);
  }

  const handleChange = (event) =>{
    setSearchTerm(event.target.value)
    dispatch(setFilteredUsersChat(event.target.value));
  }

  useEffect(() => {
    if(usersChat){
      axios.get(`${viteUrl}/api/v1/search/users?type=student`, {withCredentials: "include"}) //
        .then(({data}) => {
          console.log('allUsers: ', data)
          //const users = data.filter(item => item.id !== userChat.user_id)
          // dispatch(setAllUsersChat(users));
          // dispatch(setError(""));
        }).catch(error => {
          console.log(error.response.data)
          //dispatch(setError(error.response.data.response))
        })
    }
  },[usersChat])
  
  return (
    <div className={style.mainContainer}>
      <div className={style.chatListHeader}>
        <div>
          <img src="https://www.marthastewart.com/thmb/g-FunKfdiZombJQ7pB4wb8BF4C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cat-kitten-138468381-4cd82b91d7be45cb9f9aa8366e10bce4.jpg" className={style.headerImage}/>
        </div>
        <div className="flex gap-2 px-4">
          <div className={style.headerIcon} onClick={handleNewChat}>
            <BsFillPersonPlusFill/>
          </div>
          <div className={style.headerIcon}>
            <BsThreeDotsVertical/>
          </div>
        </div>
      </div>

      <div className={style.searchBar}>
        <div className={style.searchBarInputDiv}>
          <div>
            <BiSearchAlt2/>
          </div>
          <div className="w-full">
            <input type="text" className={style.searchBarInput} value={searchTerm} onChange={handleChange}/>
          </div>
        </div>
      </div>

      {
        newChat ? (
          <ChatNewChat/>
        ) : (
          <ChatListContactContainer/>
        )
      }

    </div>
  )
}

export default ChatList;