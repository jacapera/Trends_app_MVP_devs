import style from "./FeedCard.module.css";
import photo from "../../assets/TestIcons/landingPage.jpg";
import detailIcon from "../../assets/TestIcons/detailsIcon.png"


const FeedCard = (user) => {
    const {profile} = user.user
    console.log(user);

    return (
        <div className={style.Card}>
            <div className={style.PhotoContainer}>
                <img src={photo} alt="" />   
            </div>

            <div className={style.AttributesContainer}>
                <h1>{profile.profile.name}</h1>
                <h2>{profile.academic.area.join(" - ")}</h2>
                <h2>{profile.info.skills.join(" - ")}</h2>

                <h3>{`${profile.profile.city} - ${profile.profile.country}`}</h3>
            </div>

            <img src={detailIcon} alt="" />
        </div>
    )
}

export default FeedCard;