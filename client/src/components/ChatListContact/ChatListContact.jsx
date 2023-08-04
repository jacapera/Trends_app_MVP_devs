import style from "./ChatListContact.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectShownUser, setShownUser } from "../../Redux/usersChatSlice";

const ChatListContact = ({id, name, profile_bio, profile_image}) => {
  const dispatch = useDispatch();

  const shownUser = useSelector(selectShownUser);

  const clickHandler = () =>{
    dispatch(setShownUser(id));
  }

    const clipString = (string) =>{
        return string.slice(0, 50) + "..."
    }
    
  return (
    <div className={shownUser?.user_id === id ? style.mainContainerActive : style.mainContainer} onClick={clickHandler}>
      <img src={profile_image} className={style.image}/>
      <div className="flex flex-col justify-center">
        <p className={style.name}>{name}</p>
        <p className={style.description}>{clipString(profile_bio)}</p>
      </div>
    </div>
  )
}

export default ChatListContact;