import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";
import filterIcon from "../../assets/TestIcons/filter.png";
import { useEffect } from "react";
import {students, professionals} from "../../utils/users";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchedUsers, selectAllUsers } from "../../Redux/UsersSlice";

//import { matcher } from "../../utils/matchingAlgorithm/matcher";



const Feed = () => {

    const allUsers = useSelector(selectAllUsers);
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getMatchedUsers())
    }, []);

    return (
        <section className={style.BGContainer}>
            {/* <aside className={style.Filters}>
                <div className={style.Title}>
                    <img src={filterIcon} alt="" />
                    <h2>Filtros</h2>
                </div>
                <hr />
            </aside> */}

            <header>
                <h1>Trends</h1>
            </header>

            <div className={style.FeedContainer}>
                    <div className={style.Feed}>
                    {allUsers?.data?.map((user, userIndex) => (
                        <div key={userIndex}>
                            <FeedCard user ={user} />
                            {userIndex < allUsers.length - 1 && <hr />}
                        </div>
                    ))}
                    </div>
            </div>
        </section>
    )
}

export default Feed;