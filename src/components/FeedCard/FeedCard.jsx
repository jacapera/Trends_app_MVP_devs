import style from "./FeedCard.module.css";
import photo from "../../assets/TestIcons/landingPage.jpg";
import detailIcon from "../../assets/TestIcons/detailsIcon.png"


const FeedCard = (user) => {
    const {info, profile, academic} = user.user.user

    return (
        <div className={style.Card}>
            <div className={style.PhotoContainer}>
                <img src={photo} alt="" />   
            </div>

            <div className={style.AttributesContainer}>
                <h1>{profile.name}</h1>
                <h2>{academic.area.join(" - ")}</h2>
                <h2>{info.skills.join(" - ")}</h2>

                <h3>{`${profile.city} - ${profile.country}`}</h3>
            </div>

            <div className={style.LastContainer}>
                <h3>Estudiante</h3>
                <img src={detailIcon} alt="" />
            </div>

        </div>
    )
}

export default FeedCard;