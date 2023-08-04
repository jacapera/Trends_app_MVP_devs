import style from "./FeedCard.module.css";


const FeedCard = ({user}) => {
    return (
        <div className={style.Card}>
            <div className={style.PhotoContainer}>
                <img src={user.profile_image} alt="" />   
            </div>

            <div className={style.AttributesContainer}>
                <h1>{user.name}</h1>
                <h2>{user.academic_area}</h2>
                <h2>{user.info_skills}</h2>
                {user.profile_city || user.profile_country ? 
                    <h3>{`${user.profile_city} - ${user.profile_country}`} </h3>:
                    null
                }
            </div>
        </div>
    )
}

export default FeedCard;