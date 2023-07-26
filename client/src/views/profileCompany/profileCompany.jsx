import { useEffect, useState } from "react";
import style from "./profileCompany.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import {FaGraduationCap, FaLocationDot, FaBriefcase, FaCameraRotate, FaPenToSquare, FaFloppyDisk} from "react-icons/fa6";
import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";


export default function profileCompany() {

    //A SER REEMPLAZADO POR DATOS DEL USUARIO TRAIDOS DEL BACK
    const [userData, setUserData] = useState({
        profile: {
            company_name: "Coca Cola",
            cuit: "27303255418",
            website: "https://cocacola.com.ar",
            bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque at corporis autem quisquam ex corrupti magni minima facere, perferendis nisi pariatur aliquam ad debitis earum voluptatibus animi ullam! Dolorum, consectetur.",
            image: "https://images.unsplash.com/photo-1535990379313-5cd271a2da2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
            username: "juanperez",
            email: "coca.cola@example.com",
            password: "contraseña123",
            city: "Buenos Aires",
            country: "Argentina",
        },
        //datos para busqueda de perfiles
        academic: {
            level_required: "Avanzado", //Nivel educacion requerida
            study_area: ["Ingeniería Informática","Banca","Marketing"], //Que areas la empresa esta buscando incorporar personal?
            experience_required: "3", //Experiencia requerida
            industry: ["Finanzas y Banca","TI"], //Industria/Sector
        },
        //informacion adicional y beneficios de la empresa
        info: {
            benefits: ["Planes de seguro de salud","Flexibilidad laboral"], //Beneficios otorgados por la empresa
            skills_required: ["Programación en Python", "Desarrollo web", "Bases de datos"],
            job_description: ["Inteligencia Artificial","Desarrollo de aplicaciones móviles"], //Descripcion responsabilidades del puesto
            job_goal: ["Obtener una pasantía en una empresa de tecnología","Desarrollar habilidades de liderazgo"], //Objetivos y metas del trabajo propuesto
            languages_required: ["Español", "Inglés"],
            availability: "Full-time",
            contract_offered: "Remoto",
        },
    })

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
        profile: false,
        search: false,
        info: false,

    })
    const [shownInfo, setShownInfo] = useState("bio")
    const [profileImageDropzone, setProfileImageDropzone] = useState(false)


    //! HANDLERS DE LOS BOTONES
    // const handleInfoButton = (infoType) => {
    //     setShownInfo(infoType);
    // }

    const handleImageChangeButton = () =>{
        setProfileImageDropzone(!profileImageDropzone)
    }

    const handleProfileEditButton = () => {
        setIsEditing({
            ...isEditing,
            profile: true
        })
    }

    const handleContactInfoEditButton = () =>{
        setIsEditing({
            ...isEditing,
            contact: true
        })
    }

    const handleBioInfoEditButton = () =>{
        setIsEditing({
            ...isEditing,
            bio: true
        })
    }

    const handleGeneralInfoEditButton = () =>{
        setIsEditing({
            ...isEditing,
            general: true
        })
    }

    const handleImageChange = (newImage) => {
        setUserData({
            ...userData,
            image: newImage
        });
    };

    const handleSaveButton = (buttonName) =>{
        setIsEditing({
            ...isEditing,
            [buttonName]: false
        })
    }

    //! CHANGE HANDLER

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        const [prop, insideProp] = name.split(".");

        setUserData({
            ...userData,
            [prop]: {
                ...userData[prop],
                [insideProp]: value
            }
        })
    }

    //! -----------------------

    const [data, setData] = useState(null);
    const [countrys, setCountrys] = useState(null);

    useEffect(() => {
      const fetchdata = async () => {
        try {
          const response = await fetch('../../../src/data/data.json');
          const jsonData = await response.json();
          //console.log("que trae jsonData: ", jsonData);
          setData(jsonData);
        } catch (error) {
          console.log("error al leer data.json: ", error.message);
        }
      };
      fetchdata();
      const getCountrys = async () => {
        try {
          const response = await fetch("../src/data/country.json");
          const jsonData = await response.json();
          //console.log("que trae json data countrys: ", jsonData);
          setCountrys(jsonData);
        } catch (error) {
          console.log("error al cargar countrys: ", error.message);
        }
      };
      getCountrys();      
    }, []);    

    return(
        <div className={style.mainDiv}>

            {profileImageDropzone && <ImageDropzone className={style.dropzone} handleCancelButton={handleImageChangeButton} handleImageChange={handleImageChange}/>}

            <div className={style.profilePictureBasicInfoContainer}>
                {/* ENCABEZADO */}
                <div className={style.header}>
                    <h1>Empresa</h1>
                </div>
                {/* IMAGEN */}
                <div className={style.profilePictureContainer}>
                    <img 
                        src={userData.profile.image} 
                        alt="gatito" 
                        className={style.profilePicture}/>
                    {isProfileOwner && <button className={style.imageChangeButton} onClick={() => handleImageChangeButton()}><FaCameraRotate className={style.buttonIcon}/></button>}
                </div>
                {/* PERFIL */}
                <div className={style.userBasicInfoContainer}>
                    {isEditing.profile ? (
                        <div >
                            <label>Nombre de empresa: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.company_name" 
                                    value={userData.profile.company_name} 
                                    onChange={handleInputChange}/><br/>
                            <label>Ciudad: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.city" 
                                    value={userData.profile.city} 
                                    onChange={handleInputChange}/><br/>
                            <label>Pais: </label><br/>
                                <Select
                                    name="profile.country"
                                    value={userData.profile.country}
                                    onValueChange={handleInputChange}
                                    placeholder="--seleccione opcion--"
                                >
                                    {
                                    // data?.country.map((country,index)=>(
                                    //     <SelectItem key={index} value={country.value}>{country.value}</SelectItem>
                                    // ))
                                    countrys?.map((country, index) => (
                                        <SelectItem key={index} value={country.name}>
                                        {country.name}
                                        </SelectItem>
                                    ))
                                    }
                                </Select>                                    
                            <label>Sitio Web: </label><br/>        
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.website" 
                                    value={userData.profile.website} 
                                    onChange={handleInputChange}/><br/>
                            <label>Cuit: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.cuit" 
                                    value={userData.profile.cuit} 
                                    onChange={handleInputChange}/><br/>
                            <label>Email: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.email" 
                                    value={userData.profile.email} 
                                    onChange={handleInputChange}/><br/>
                            <label>Bio de la empresa: </label><br/>
                                <textarea
                                className={style.headerEditionInput} 
                                name="profile.bio" 
                                rows="20" cols="50"
                                value={userData.profile.bio} 
                                onChange={handleInputChange}/><br/>
                            
                        </div>
                    ):(
                        <div className={style.infoContainer}>
                            <p className={style.userInfoName}>{userData.profile.company_name}</p>
                            <p>{userData.profile.city}, {userData.profile.country}</p>
                            <p>{userData.profile.website}</p>
                            <p>cuit: {userData.profile.cuit}</p>
                            <p>email : {userData.profile.email}</p>
                            <p>"Este es un ejemplo de bio: {userData.profile.bio}"</p>
                        </div>
                    )}

                    {isProfileOwner && 
                        <div className={style.headerButtonContainer}>
                            {isEditing.profile ? (
                                <button className={style.saveButton} onClick={() => handleSaveButton("profile")}><FaFloppyDisk/></button>
                                ):(
                                <button className={style.editionButton} onClick={() => handleProfileEditButton()}><FaPenToSquare className={style.buttonIcon}/></button>
                            )}
                        </div>
                    }
                </div>

            </div>

        </div> 
            
    )
};