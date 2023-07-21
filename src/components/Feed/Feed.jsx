import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";
import filterIcon from "../../assets/TestIcons/filter.png";
import { useEffect } from "react";
import {students, professionals} from "../../utils/users";
import { useState } from "react";
import { matcher } from "../../utils/matchingAlgorithm/matcher";

const Feed = () => {
    
    const [matchedProfilesStudents, setMatchedProfilesStudents] = useState([]);
    const [matchedProfilesProfessionals, setMatchedProfilesProfessionals] = useState([]);
    const [allUsers, setAllUsers] = useState([])

    //function for join the 2 diferents arrays of users, the order is 5 professionals and 2 students (this could be change)
    function showProfessionalsAndStudents(professionals, students) {
        let combinedArray = [];
        let professionalsIndex = 0;
        let studentsIndex = 0;
        const professionalsPerGroup = 5;
        const studentsPerGroup = 2;
      
        while (professionalsIndex < professionals.length || studentsIndex < students.length) {

          // Show 5 professionals
          for (let i = 0; i < professionalsPerGroup; i++) {
            if (professionalsIndex < professionals.length) {
              combinedArray.push(professionals[professionalsIndex])
              professionalsIndex++;
            }
          }
      
          // Show 2 students
          for (let i = 0; i < studentsPerGroup; i++) {
            if (studentsIndex < students.length) {
              combinedArray.push(students[studentsIndex])
              studentsIndex++;
            }
          }
        }

        return combinedArray;
    }

    useEffect(() => {
        const matchedProfilesForStudent = matcher(professionals, students[1]);
        const matchedProfilesForProfessionals = matcher(students, professionals[3]);
        setMatchedProfilesStudents(matchedProfilesForProfessionals);
        setMatchedProfilesProfessionals(matchedProfilesForStudent);
    }, [])

    useEffect(() => {
        const users = showProfessionalsAndStudents(matchedProfilesProfessionals, matchedProfilesStudents);
        setAllUsers(users);
    }, [matchedProfilesProfessionals, matchedProfilesStudents])


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