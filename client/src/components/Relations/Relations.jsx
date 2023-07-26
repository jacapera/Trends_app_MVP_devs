import style from "./Relations.module.css";
import dog from "../../assets/TestIcons/landingPage.jpg"

const Relations = () => {
    return (
        <div>
            <div className={style.Container}>
                <div className={style.ImageContainer}>
                    <img src={dog} alt="" />
                </div>
                <div>
                    <h3>Hola esto es informacion</h3>
                    <h3>Hola esto es informacion</h3>
                </div>

            </div>
            <hr />
        </div>
    )
} 

export default Relations