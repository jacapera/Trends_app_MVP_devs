import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";
import filterIcon from "../../assets/TestIcons/filter.png";
import { useEffect } from "react";
import { matcher } from "../../utils/matchAlgorithm";
import { professionals, students } from "../../utils/users";
import { useState } from "react";

const Feed = () => {

    const [matchedProfilesStudents, setMatchedProfilesStudents] = useState([]);
    const [matchedProfilesProfessionals, setMatchedProfilesProfessionals] = useState([]);

    useEffect(() => {
        const matchedProfilesForStudent = matcher(professionals, students[1]);
        const matchedProfilesForProfessionals = matcher(students, professionals[3]);
        setMatchedProfilesStudents(matchedProfilesForProfessionals);
        setMatchedProfilesProfessionals(matchedProfilesForStudent)
    }, [])

    const divideProfilesIntoGroups = (profiles) => {
        const groups = [];
        for (let i = 0; i < profiles.length; i += 3) {
            groups.push(profiles.slice(i, i + 3));
        }
        return groups;
    };

    const profileGroups = divideProfilesIntoGroups(matchedProfilesStudents);



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