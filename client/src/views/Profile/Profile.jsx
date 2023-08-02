import { useState } from "react";
import style from "./Profile.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import { AiFillEdit } from "react-icons/ai";
import Relations from "../../components/Relations/Relations";



const Profile = () => {

    //A SER REEMPLAZADO POR DATOS DEL USUARIO TRAIDOS DEL BACK
    const userData = {
        type: "Professional",
        email: "juan.perez@example.com",
        username: "juanperez",
        password: "contraseña123",
        name: "Juan Perez",
        profile_bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque at corporis autem quisquam ex corrupti magni minima facere, perferendis nisi pariatur aliquam ad debitis earum voluptatibus animi ullam! Dolorum, consectetur.",
        profile_age: "23",
        profile_image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        profile_city: "Buenos Aires",
        profile_country: "Argentina",
        profile_support: true,
        academic_formation: "Universitario Avanzado",
        academic_institution: "Universidad Nacional de Buenos Aires",
        academic_level: "En curso",
        academic_area: ["Ingeniería Informática"],
        academic_graduation: "2023",
        info_company_name: "", //Only for professionals
        info_position: "", //Only for professionals
        info_career: ["Desarrollo de Software"],
        info_skills: ["Programación en Python", "Desarrollo web", "Bases de datos"],
        info_goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
        info_interests: [
          "Inteligencia Artificial",
          "Desarrollo de aplicaciones móviles",
        ],
        info_problematic: [
          "Falta de información del mercado laboral",
          "Falta de guía profesional",
        ],
        info_languages: ["Español", "Inglés"],
        info_availability: "Full-time",
        info_contract: "Remoto",
      };

    const profileData = userData;

    //*No se qué tanta info vamos a tener de la info academica o laboral
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
    const [isEditing, setIsEditing] = useState({
        image: false,
        general: false
    })


    //! HANDLERS DE LOS BOTONES
    // const handleInfoButton = (infoType) => {
    //     setShownInfo(infoType);
    // }

    const handleImageChangeButton = () =>{
        setIsEditing((prevState) => ({...prevState, image: false}))
    }

    const handleGeneralChangeButton = () => {
        setIsEditing((prevState) => ({...prevState, general: false}))
    }

    const handleGeneralEdit = () =>{
        setIsEditing({
            ...isEditing,
            general: true
        })
    }

    return(
        <div className={style.BGContainer}>
            {
                isEditing.image &&
                <div className={style.EditPhoto}>
                    <ImageDropzone userData={profileData} type={"photo"} handleCancelButton={handleImageChangeButton}/>
                </div>
            }

            {isEditing.general &&
            <div className={style.EditPhoto}>
                <ImageDropzone userData={profileData} type={"general"} handleCancelButton={handleGeneralChangeButton}/>
            </div>
            }
            <header>
                    <div className={style.ImageContainer} onClick={() => setIsEditing(prevState => ({...prevState, image: !prevState.image}))}>
                        <img src={userData.profile_image} alt="" />
                        <div className={style.Extra}></div>
                        <div className={style.IconContainer}>
                            <AiFillEdit size="6rem" color="white"/>
                        </div>
                    </div>

                    <h1>Student</h1>

                    <button onClick={handleGeneralEdit} className={style.EditButton}>
                        <AiFillEdit size="2rem" color="#344C5A"/>
                    </button>
            </header>

            <main>
                <div className={style.Profile}>
                    <section>
                        <div className={style.About}>
                            <div className={style.FirstInfo}>
                                <h1>{userData.name}</h1>
                                <h3>{userData.info_skills.join(" - ")}</h3>
                                <h3>{userData.profile_city} - {userData.profile_country}</h3>
                            </div>
                            
                        </div>
                    </section>
                    <hr />
                    <section>
                        <h2>Biography</h2>
                        <div className={style.Bio}>
                            <h3>{userData.profile_bio}</h3>
                        </div>
                    </section>
                    <hr />
                    <section>
                        <h2>Studies</h2>
                        <div className={style.Studies}>
                            <h3>{userData.academic_institution}</h3>
                        </div>

                    </section>
                </div>

                <div className={style.Relations}>
                    <Relations/>
                    <Relations/>
                    <Relations/>
                    <Relations/>
                </div>
            </main>
        </div>


        // <div className={style.mainDiv}>

        //     {profileImageDropzone && <ImageDropzone className={style.dropzone} handleCancelButton={handleImageChangeButton} handleImageChange={handleImageChange}/>}

        //     <div className={style.header}>
        //         <p>Estudiante</p>
        //     </div>

        //     <div className={style.profilePictureBasicInfoContainer}>
        //         <div className={style.profilePictureContainer}>
        //             <img src={userData.profile.image} alt="gatito" className={style.profilePicture}/>
        //             {isProfileOwner && <button className={style.imageChangeButton} onClick={() => handleImageChangeButton()}><FaCameraRotate className={style.buttonIcon}/></button>}
        //         </div>

        //         <div className={style.userBasicInfoContainer}>
        //             {isEditing.basic ? (
        //                 <div className={style.headerEditionContainer}>
        //                     <input className={style.headerEditionInput} type="text" name="profile.name" value={userData.profile.name} onChange={handleInputChange}/>
        //                     <div>
        //                         <input className={style.headerEditionInput} type="text" name="academic.type" value={userData.academic.type} onChange={handleInputChange}/>
        //                         <input className={style.headerEditionInput} type="text" name="academic.institution" value={userData.academic.institution} onChange={handleInputChange}/>
        //                     </div>
        //                     <div>
        //                     </div>
        //                 </div>
        //             ):(
        //                 <div>
        //                     <p className={style.userInfoName}>{userData.profile.name}</p>
        //                     <p className={style.userInfoAcademic}>{userData.academic.type} de {userData.academic.area} en {userData.academic.institution}.</p>
        //                     <p className={style.userInfoBio}>"Este es un ejemplo de bio: {userData.profile.bio}"</p>
        //                 </div>
        //             )}

        //             {isProfileOwner && 
        //                 <div className={style.headerButtonContainer}>
        //                     {isEditing.basic ? (
        //                         <button className={style.saveButton} onClick={() => handleSaveButton("basic")}><FaFloppyDisk/></button>
        //                         ):(
        //                         <button className={style.editionButton} onClick={() => handleBasicInfoEditButton()}><FaPenToSquare className={style.buttonIcon}/></button>
        //                     )}
        //                 </div>
        //             }
        //         </div>
        //     </div>

        //     <div className={style.body}>
        //         <div className={style.generalInfoContainer}>
        //             {isEditing.general ? (
        //                 <div>
        //                     <input type="text" name="profile.bio" value={userData.profile.bio} onChange={handleInputChange}/>
        //                     <button className={style.saveButton} onClick={() => handleSaveButton("general")}><FaFloppyDisk/></button>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     <p>Información relevante:</p>
        //                     {isProfileOwner && <button className={style.editionButton} onClick={handleBioInfoEditButton}><FaPenToSquare className={style.buttonIcon}/></button>}
        //                     {userData.profile.city && <p className={style.informationText}><FaLocationDot className={style.informationIcon}/> Vive en: {userData.profile.city}, {userData.profile.country}</p>}
        //                     {userData.academic.area && <p className={style.informationText}><FaGraduationCap className={style.informationIcon}/> {userData.academic.type} de {userData.academic.area} en {userData.academic.institution}</p>}
        //                     {userData.info.career && <p className={style.informationText}><FaBriefcase className={style.informationIcon}/> Buscando oportunidades laborales en el área {userData.info.career}</p>}
        //                     {userData.info.goals && (
        //                         <ul>
        //                             {userData.info.goals.map((goal, index) => (
        //                                 <li key={index}>{goal}</li>
        //                             ))}
        //                         </ul>
        //                     )}
        //                     <p>Habilidades en:</p>
        //                     {userData.info.skills && (
        //                         <ul>
        //                             {userData.info.skills.map((skill, index) => (
        //                                 <li key={index}>{skill}</li>
        //                             ))}
        //                         </ul>
        //                     )}
        //                 </div>
        //             )}
        //         </div>


        //     </div>
        // </div> 
            
    )
}

export default Profile;
