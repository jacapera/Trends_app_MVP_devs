import { useSelector } from "react-redux";
import style from "./ChatMessage.module.css"
import { selectUserProfile } from "../../Redux/UsersSlice";

const ChatMessage = ({userId, username, profile_image, messageId, createdAt, content, status, isGroup}) => {

    const user = useSelector(selectUserProfile)

    const myId = user.id;
  
    return (
      <div className={userId === myId ? style.myContainer : style.elseContainer}>
        {(isGroup && userId!==myId) && (
            <div>
                <img src={profile_image} className={style.image}/>
            </div>
        )}
        <div className={userId === myId ? style.myMessageContainer : style.messageContainer}>
            {(isGroup && userId!==myId) && (
                <p className={style.username}>{username}</p>
            )}
            <p className={style.messageContent}>
                {content}
            </p>
            <div className={style.footer}>
                <p className={style.time}>
                    {new Date(createdAt).toLocaleString()}
                </p>
                <p className={style.status}>
                    {status}
                </p>
            </div>
        </div>
      </div> 
    )
  }
  
  export default ChatMessage;