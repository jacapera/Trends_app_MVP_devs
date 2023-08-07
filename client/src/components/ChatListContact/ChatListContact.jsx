import style from "./ChatListContact.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectShownUser, setSelectedUser, setShownUser } from "../../Redux/usersChatSlice";

const ChatListContact = ({id, chat_id, name, profile_bio, profile_image}) => {
  const dispatch = useDispatch();

  const shownUser = useSelector(selectShownUser);

  const clickHandler = (user) =>{
    dispatch(setShownUser(id));
    dispatch(setSelectedUser({
      id,
      chat_id,
      username: name,
      profile_image
    }));
  }

    const clipString = (string) =>{
        return string.slice(0, 50) + "..."
    }

  return (
    <div className={shownUser?.id === id ? style.mainContainerActive : style.mainContainer} onClick={clickHandler}>
      <img src={profile_image} className={style.image}/>
      <div className="flex flex-col justify-center">
        <p className={style.name}>{name}</p>
        <p className={style.description}>{clipString(profile_bio)}</p>
      </div>
    </div>
  )
}

export default ChatListContact;