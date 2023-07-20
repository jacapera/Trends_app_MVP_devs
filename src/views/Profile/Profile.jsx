import { useState } from "react";
import style from "./Profile.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import {FaGraduationCap, FaLocationDot, FaBriefcase, FaCameraRotate} from "react-icons/fa6";

const Profile = () => {

    //A SER REEMPLAZADO POR DATOS DEL USUARIO TRAIDOS DEL BACK
    const [userData, setUserData] = useState({
        profile: {
            name: "Mariana Marianez",
            bio:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
            image:"https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            username: "LaMari1234",
            email: "marianaladeejemplo@unhost.com",
            password: "0303456lalalalala",
            city: "Villa Ejemplo, Córdoba",
            country: "Argentina",
            support: true,   // dar apoyo
        },
        academic: {
            type: "Junior",   // Sin exp - Junior - Intermedio - Senior
            institution: "Instituto Nacional de Ejemplificación",
            level: "Educación Terciaria",  // Nivel educativo
            area: [],  // Área de su(s) carrera(s) (con grado y/o posgrado)
            graduation: new Date(),
        },
        info: {
            company_name:"EjempTec",
            position: "Middle Management",
            career: ["En mi puesto de gerente, logré hacer un coso con el cosito y me fué bien - 10/10", "Cuando era instrumentista quirúrjico, todos mis pacientes dieron revies positivas", "Siendo portero en la NASA, pude lograr que se abran muchas puertas"],  // responsabilidades, logros
            skills: ["Liderazgo", "Teamwork", "Resolucion de problemas", "Coso"],
            interests: ["Lo jueguito", "Deporte"],
            goals: ["Ejemplo de goal 1", "Ejemplo de otro goal"],
            languages: ["español", "ingles", "chino simplificado"],
            availability: "Part-time",
            contract: "Planta permanente",   // Tipo de contratación
        },
    })

    //*No se qué tanta info vamos a tener de la info academica o laboral
    const academicInfo = [{
        career: "Tecnicatura en desarrollo de software",
        status: "Completed",
        institution: "Instituto Provincial de Coso",
        startYear: "2017",
        finishYear: "2019"
    },{
        career: "Bootcamp de desarrollo fullstack",
        status: "Ongoing",
        institution: "HENRY",
        startYear: "2023",
        finishYear: "Ongoing"
    }]

    const jobsInfo = [{
        job: "Docente",
        company: "Instituto Privado Pincen",
        startYear: "2019",
        finishYear: "2022"
    },{
        job: "Empleado administrarivo",
        company: "FLS Agro S.R.L.",
        startYear: "2018",
        finishYear: "Ongoing"
    }]

    const contactInfo = [{
        contactType: "Número de telefono",
        contactInfo: "03385-123456"
    },{
        contactType: "LinkedIn",
        contactInfo: "https://www.linkedin.com/in/luciano-gianoglio/"
    },{
        contactType: "Email",
        contactInfo: "luchogianoglio@gmail.com"
    }]
    //*----------------------------------------------------------------

    const [isProfileOwner, setIsProfileOwner] = useState(true);
    const [shownInfo, setShownInfo] = useState("bio")
    const [profileImageDropzone, setProfileImageDropzone] = useState(false)



    const handleInfoButton = (infoType) => {
        setShownInfo(infoType);
    }

    const handleImageChangeButton = () =>{
        setProfileImageDropzone(!profileImageDropzone)
    }

    const handleProfileImageChange = (newImage) => {
        setProfileImage(newImage);
    };

    return(
        <div className={style.mainDiv}>
            {profileImageDropzone && <ImageDropzone className={style.dropzone} handleCancelButton={handleImageChangeButton}/>}
            <div className={style.headerDiv}>
                <div className={style.headerInfo}>
                    <div>
                        <img src={userData.profile.image} alt="gatito" className={style.profilePicture}/>
                        {isProfileOwner && <button className={style.pictureChangeButton} onClick={() => handleImageChangeButton()}><FaCameraRotate/></button>}
                    </div>
                    <div className={style.userInfo}>
                        <p className={style.userInfoName}>{userData.profile.name}</p>
                        <p className={style.userInfoAcademic}>{userData.academic.type} - {userData.academic.institution}</p>
                    </div>
                </div>
            </div>
            <div className={style.infoDiv}>
                <div className={style.infoLeftDiv}>
                    <div className={style.infoButtonDiv}>
                        <p>Información</p>
                        <button className={shownInfo === "bio" ? style.activeButton : style.button} onClick={() => handleInfoButton("bio")}>Bio</button>
                        <button className={shownInfo === "general" ? style.activeButton : style.button} onClick={() => handleInfoButton("general")}>Información general</button>
                        <button className={shownInfo === "academic" ? style.activeButton : style.button} onClick={() => handleInfoButton("academic")}>Formación académica</button>
                        <button className={shownInfo === "job" ? style.activeButton : style.button} onClick={() => handleInfoButton("job")}>Experiencia laboral</button>
                    </div>
                    <div>
                        {contactInfo && contactInfo.map(contact =>{
                            return(
                                <div className={style.individualContactDiv}>
                                    <p className={style.contactType}>{contact.contactType}</p>
                                    <p className={style.contactInfo}>{contact.contactInfo}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {shownInfo === "bio" && (
                    <div className={style.infoCard}>
                        {userData.profile.bio && <span className={style.bio}>"{userData.profile.bio}"</span>}
                    </div>
                )}
                {shownInfo === "general" && (
                    <div className={style.infoCard}>
                        {userData.info.position && <span><FaBriefcase className={style.infoIcon}/>Trabaja como: {userData.info.position} en {userData.info.company_name}</span>}
                        {userData.academic.institution && <span><FaGraduationCap className={style.infoIcon}/>Estudió en: {userData.academic.institution}</span>}
                        {userData.profile.city && <span><FaLocationDot className={style.infoIcon}/>Vive en: {userData.profile.city}, {userData.profile.country}</span>}
                    </div>
                )}
                {shownInfo === "academic" && (
                    <div className={style.infoCard}>
                        {academicInfo && academicInfo.map(career => {
                            return(
                                <span><FaGraduationCap className={style.infoIcon}/>{career.status} carrera de {career.career} en {career.institution}</span>
                            )
                        })}
                    </div>
                )}
                {shownInfo === "job" && (
                    <div className={style.infoCard}>
                        {jobsInfo && jobsInfo.map(job => {
                            return(
                                <span><FaGraduationCap className={style.infoIcon}/>{job.job} en {job.company}</span>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;