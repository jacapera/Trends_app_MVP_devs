import style from "./ChatMessages.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {VscSmiley} from "react-icons/vsc"
import {AiOutlinePaperClip} from "react-icons/ai"
import {TbSend} from "react-icons/tb"
import {FaWindowMinimize} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {selectSelectedUser, setIsMinimized} from "../../Redux/chatSlice"
import { useState } from "react"
import { selectUserProfile } from "../../Redux/UsersSlice"
import { ChatMessageContainer } from ".."

const ChatMessages = ({socket}) => {
  
  const [message, setMessage] = useState("");
  
  const user = useSelector(selectUserProfile);
  const selectedUser = useSelector(selectSelectedUser)
  
  const dispatch = useDispatch();

  const handleMinimize = () =>{
    dispatch(setIsMinimized(true))
  }

  const handleChange = (event) =>{
    event.preventDefault()
    setMessage(event.target.value)
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      message.trim() !== '' && sendMessage(event);
    }
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if(message !== '' ){
      const sender_id = user.id;
      const receiver_id = selectedUser?.UserReceived?.user_id === user.id
        ? selectedUser.UserSent?.user_id : selectedUser?.UserSent?.user_id === user.id
        ? selectedUser?.UserReceived?.user_id : selectedUser?.id !== user.id && selectedUser?.id;
      const content = message;
      const userNameReceptor =
        selectedUser?.UserReceived?.userName === user.userName
        ? selectedUser?.UserSent?.userName : selectedUser?.UserSent?.userName === user.userName
        ? selectedUser?.UserReceived?.userName : selectedUser?.userName !== user.userName
        && selectedUser?.username;
      //const imageReceptor = selectedUser?.image;
      const userNameEmisor = user.username;
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
      setMessage("");
      //setPreview(false);
    }
    
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.chatHeader}>
        <div className={style.infoDiv}>
            <img src={selectedUser.image} className={style.profileImage}/>
            <div>
                <p className={style.name}>{selectedUser.name}</p>
                <p className={style.status}>online/offline</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button className={style.headerIcon}><BiDotsVerticalRounded/></button>
            <button className={style.headerIcon} onClick={handleMinimize}><FaWindowMinimize className="text-base"/></button>
        </div>
      </div>

      <ChatMessageContainer className={style.chatContainer} />

      <div className={style.messageBar}>
        <div className={style.messageBarIconDiv}>
            <VscSmiley className={style.messageBarIcon}/>
            <AiOutlinePaperClip className={style.messageBarIcon}/>
        </div>
        {/* INPUT MENSAJE TEXTO */}
        <form onSubmit={sendMessage} className={style.messageBarInputDiv}>
            <input className={style.messageBarInput} type="text" value={message} onChange={handleChange} onKeyDown={handleKeyDown}/>
            <button className={style.messageBarInputButton} type="submit">
              <TbSend  onClick={sendMessage}/>
            </button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessages;