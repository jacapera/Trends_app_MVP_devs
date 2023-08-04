import style from "./ChatMessages.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {VscSmiley} from "react-icons/vsc"
import {AiOutlinePaperClip} from "react-icons/ai"
import {TbSend} from "react-icons/tb"
import {FaWindowMinimize} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {setIsMinimized} from "../../Redux/chatSlice"
import { selectAllUsersChat, selectShownUser } from "../../Redux/usersChatSlice"
import { useState } from "react"
import { messagePrivate } from "../../utils/functionsChat"

const ChatMessages = ({token}) => {

  const dispatch = useDispatch();

  const shownUser = useSelector(selectShownUser);
  const userChat = useSelector(selectAllUsersChat);
  console.log("shownUser: ", shownUser)

  const [message, setMessage] = useState("");

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
      message.trim() !== '' && messagePrivate(userChat, shownUser, socket, event);
    }
  }

  const handleSumit = (event) => {
    event.preventDefault();
    messagePrivate(userChat, shownUser, socket, event);
  }

  const handleSend = () =>{
    alert("enviado el mensaje: '" + message + "' a " + shownUser.name);
    setMessage("");
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.chatHeader}>
        <div className={style.infoDiv}>
            <img src={shownUser?.profile_image} className={style.profileImage}/>
            <div>
                <p className={style.userName}>{shownUser?.name}</p>
                <p className={style.status}> online/offline</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className={style.headerIcon}><BiDotsVerticalRounded/></button>
            <button className={style.headerIcon} onClick={handleMinimize}><FaWindowMinimize className="text-base"/></button>
        </div>
      </div>
      <div className={style.chatContainer}>
        {/* CHAT CONTAINER PLACEHOLDER */}
      </div>
      <div className={style.messageBar}>
        <div className={style.messageBarIconDiv}>
            <VscSmiley className={style.messageBarIcon}/>
            <AiOutlinePaperClip className={style.messageBarIcon}/>
        </div>
        {/* INPUT MENSAJE TEXTO */}
        <form onSubmit={handleSumit} className={style.messageBarInputDiv}>
            <input className={style.messageBarInput} type="text" value={message} onChange={handleChange} onKeyDown={handleKeyDown}/>
            <button className={style.messageBarInputButton} type="submit">
              <TbSend  onClick={handleSumit}/>
            </button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessages;