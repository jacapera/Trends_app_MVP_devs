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

    //function to divide in groups of 3 users (for the cards)
    const divideProfilesIntoGroups = (profiles) => {
        const groups = [];
        for (let i = 0; i < profiles.length; i += 3) {
            groups.push(profiles.slice(i, i + 3));
        }
        return groups;
    };

    const profileGroups = divideProfilesIntoGroups(allUsers);

    return (
        <section className={style.BGContainer}>
            <aside className={style.Filters}>
                <div className={style.Title}>
                    <img src={filterIcon} alt="" />
                    <h2>Filtros</h2>
                </div>
                <hr />
            </aside>

            <div className={style.FeedContainer}>
                {profileGroups.map((group, index) => (
                    <div className={style.Feed} key={index}>
                    {group.map((user, userIndex) => (
                        <div key={userIndex}>
                            <FeedCard user ={user} />
                            {userIndex < group.length - 1 && <hr />}
                        </div>   
                    ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Feed;