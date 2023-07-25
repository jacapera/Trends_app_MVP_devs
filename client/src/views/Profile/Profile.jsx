import { useState } from "react";
import style from "./Profile.module.css";
import { ImageDropzone } from "../../components";
import {
  FaGraduationCap,
  FaLocationDot,
  FaBriefcase,
  FaCameraRotate,
  FaPenToSquare,
  FaFloppyDisk,
} from "react-icons/fa6";

const Profile = () => {
  //A SER REEMPLAZADO POR DATOS DEL USUARIO TRAIDOS DEL BACK
  const [userData, setUserData] = useState({
    profile: {
      name: "Juan Perez",
      bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque at corporis autem quisquam ex corrupti magni minima facere, perferendis nisi pariatur aliquam ad debitis earum voluptatibus animi ullam! Dolorum, consectetur.",
      image:
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
      username: "juanperez",
      email: "juan.perez@example.com",
      password: "contraseña123",
      city: "Buenos Aires",
      country: "Argentina",
      support: true,
    },
    academic: {
      type: "Universitario Avanzado",
      institution: "Universidad Nacional de Buenos Aires",
      level: "En curso",
      area: ["Ingeniería Informática"],
      graduation: "2023",
    },
    info: {
      career: ["Desarrollo de Software"],
      skills: ["Programación en Python", "Desarrollo web", "Bases de datos"],
      goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
      interests: [
        "Inteligencia Artificial",
        "Desarrollo de aplicaciones móviles",
      ],
      problematic: [
        "Falta de información del mercado laboral",
        "Falta de guía profesional",
      ],
      languages: ["Español", "Inglés"],
      availability: "Full-time",
      contract: "Remoto",
    },
  });

  //*No se qué tanta info vamos a tener de la info academica o laboral
  const contactInfo = [
    {
      contactType: "Número de telefono",
      contactInfo: "03385-123456",
    },
    {
      contactType: "LinkedIn",
      contactInfo: "https://www.linkedin.com/in/luciano-gianoglio/",
    },
    {
      contactType: "Email",
      contactInfo: "luchogianoglio@gmail.com",
    },
  ];
  //*----------------------------------------------------------------

  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const [isEditing, setIsEditing] = useState({
    basic: false,
    contact: false,
    general: false,
  });
  const [shownInfo, setShownInfo] = useState("bio");
  const [profileImageDropzone, setProfileImageDropzone] = useState(false);

  //! HANDLERS DE LOS BOTONES
  // const handleInfoButton = (infoType) => {
  //     setShownInfo(infoType);
  // }

  const handleImageChangeButton = () => {
    setProfileImageDropzone(!profileImageDropzone);
  };

  const handleBasicInfoEditButton = () => {
    setIsEditing({
      ...isEditing,
      basic: true,
    });
  };

  const handleContactInfoEditButton = () => {
    setIsEditing({
      ...isEditing,
      contact: true,
    });
  };

  const handleBioInfoEditButton = () => {
    setIsEditing({
      ...isEditing,
      bio: true,
    });
  };

  const handleGeneralInfoEditButton = () => {
    setIsEditing({
      ...isEditing,
      general: true,
    });
  };

  const handleImageChange = (newImage) => {
    setUserData({
      ...userData,
      image: newImage,
    });
  };

  const handleSaveButton = (buttonName) => {
    setIsEditing({
      ...isEditing,
      [buttonName]: false,
    });
  };

  //! CHANGE HANDLER

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [prop, insideProp] = name.split(".");

    setUserData({
      ...userData,
      [prop]: {
        ...userData[prop],
        [insideProp]: value,
      },
    });
  };

  //! -----------------------

  return (
    <div className={style.mainDiv}>
      {profileImageDropzone && (
        <ImageDropzone
          className={style.dropzone}
          handleCancelButton={handleImageChangeButton}
          handleImageChange={handleImageChange}
        />
      )}

      <div className={style.header}>
        <p>Estudiante</p>
      </div>

      <div className={style.profilePictureBasicInfoContainer}>
        <div className={style.profilePictureContainer}>
          <img
            src={userData.profile.image}
            alt="gatito"
            className={style.profilePicture}
          />
          {isProfileOwner && (
            <button
              className={style.imageChangeButton}
              onClick={() => handleImageChangeButton()}
            >
              <FaCameraRotate className={style.buttonIcon} />
            </button>
          )}
        </div>

        <div className={style.userBasicInfoContainer}>
          {isEditing.basic ? (
            <div className={style.headerEditionContainer}>
              <input
                className={style.headerEditionInput}
                type="text"
                name="profile.name"
                value={userData.profile.name}
                onChange={handleInputChange}
              />
              <div>
                <input
                  className={style.headerEditionInput}
                  type="text"
                  name="academic.type"
                  value={userData.academic.type}
                  onChange={handleInputChange}
                />
                <input
                  className={style.headerEditionInput}
                  type="text"
                  name="academic.institution"
                  value={userData.academic.institution}
                  onChange={handleInputChange}
                />
              </div>
              <div></div>
            </div>
          ) : (
            <div>
              <p className={style.userInfoName}>{userData.profile.name}</p>
              <p className={style.userInfoAcademic}>
                {userData.academic.type} de {userData.academic.area} en{" "}
                {userData.academic.institution}.
              </p>
              <p className={style.userInfoBio}>
                "Este es un ejemplo de bio: {userData.profile.bio}"
              </p>
            </div>
          )}

          {isProfileOwner && (
            <div className={style.headerButtonContainer}>
              {isEditing.basic ? (
                <button
                  className={style.saveButton}
                  onClick={() => handleSaveButton("basic")}
                >
                  <FaFloppyDisk />
                </button>
              ) : (
                <button
                  className={style.editionButton}
                  onClick={() => handleBasicInfoEditButton()}
                >
                  <FaPenToSquare className={style.buttonIcon} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={style.body}>
        <div className={style.generalInfoContainer}>
          {isEditing.general ? (
            <div>
              <input
                type="text"
                name="profile.bio"
                value={userData.profile.bio}
                onChange={handleInputChange}
              />
              <button
                className={style.saveButton}
                onClick={() => handleSaveButton("general")}
              >
                <FaFloppyDisk />
              </button>
            </div>
          ) : (
            <div>
              <p>Información relevante:</p>
              {isProfileOwner && (
                <button
                  className={style.editionButton}
                  onClick={handleBioInfoEditButton}
                >
                  <FaPenToSquare className={style.buttonIcon} />
                </button>
              )}
              {userData.profile.city && (
                <p className={style.informationText}>
                  <FaLocationDot className={style.informationIcon} /> Vive en:{" "}
                  {userData.profile.city}, {userData.profile.country}
                </p>
              )}
              {userData.academic.area && (
                <p className={style.informationText}>
                  <FaGraduationCap className={style.informationIcon} />{" "}
                  {userData.academic.type} de {userData.academic.area} en{" "}
                  {userData.academic.institution}
                </p>
              )}
              {userData.info.career && (
                <p className={style.informationText}>
                  <FaBriefcase className={style.informationIcon} /> Buscando
                  oportunidades laborales en el área {userData.info.career}
                </p>
              )}
              {userData.info.goals && (
                <ul>
                  {userData.info.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              )}
              <p>Habilidades en:</p>
              {userData.info.skills && (
                <ul>
                  {userData.info.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
