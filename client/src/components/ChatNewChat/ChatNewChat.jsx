import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./ChatNewChat.module.css"
import { selectFilteredUsersChat } from "../../Redux/usersChatSlice";
import{ ChatListContact, ChatNewGroup } from "../index"

const ChatNewChat = () =>{

    const users = useSelector(selectFilteredUsersChat);
    const [tab, setTab] = useState("chat")

    return(
        <div className={style.mainContainer}>
            <div className={style.tabContainer}>
                <div className={(tab==="chat") ? style.tabActive : style.tabInactive} onClick={()=>setTab("chat")}>
                    <p className={style.tabText}>Nuevo Chat</p>
                </div>
                <div className={(tab==="group") ? style.tabActive : style.tabInactive} onClick={()=>setTab("group")}>
                    <p className={style.tabText}>Nuevo Grupo</p>
                </div>
            </div>

            {(tab==="chat") ? (
                users?.map(user => {
                    return(
                        <ChatListContact
                            id={user.user_id}
                            name={user.name}
                            profile_bio={user.profile_bio}
                            profile_image={user.profile_image}
                        />
                    )
                })
            ):(
                <ChatNewGroup/>
            )}
        </div>
    )
}

export default ChatNewChat;