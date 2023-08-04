<<<<<<< HEAD
import { useEffect, useState } from "react";
import style from "./profileCompany.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import {FaGraduationCap, FaLocationDot, FaBriefcase, FaCameraRotate, FaPenToSquare, FaFloppyDisk , FaRectangleXmark} from "react-icons/fa6";
import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import { useSelector } from "react-redux";


export default function profileCompany() {

    const companyDataSG = useSelector((state)=>state.users.companies);
    const [companyData, setCompanyData] = useState(companyDataSG);

    //*----------------------------------------------------------------

    const [isProfileOwner, setIsProfileOwner] = useState(true);
    const [isEditing, setIsEditing] = useState({
        profile: false,
        search: false,
        info: false,

    })


    //! HANDLERS DE LOS BOTONES

    const handleProfileEditButton = () => {
        setIsEditing({
            ...isEditing,
            profile: true
        })
    }

    //?AL PRESIONAR GUARDAR ENVIO DATOS A BACK PARA ACTUALIZAR
    const handleSaveButton = async(buttonName) =>{
        const URL = 'http://localhost:3001/api/v1/search/user';
        const ID = 'e6a7cbda-ad96-410e-9a15-a6182c462528';
        //envio datos
        try{
            console.log("ACTUALIZO DATOS EMPRESA", companyData)
            //await axios.put(`${URL}/...`,companyData)
            //.then(async res=>{
            //    alert(res.data)
            //})
            
        }catch(error){
            console.log("error al enviar put empresa: ", error.message);
        }

        //cambio a false edicion de perfil
        setIsEditing({
            ...isEditing,
            [buttonName]: false
        });
    }

    //! CHANGE HANDLER

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setCompanyData({
            ...companyData,
            [name]:value
        });
    };

    const handleSelectChange = (prop,value) =>{
        setCompanyData({
            ...companyData,
            [prop]:value
        })
    }

    //! -----------------------

    const [countrys, setCountrys] = useState(null);

    //?AL MODIFICAR ALGUN INPUT
    useEffect(()=>{
        console.log("que modifico companyData", companyData)
    },[companyData])


    const deletePropJobsSL = ()=>{
        const newState = {...companyDataSG}
        delete newState.jobs;
        setCompanyData(newState);
    }

    //?AL MONTARSE COMPONENTE
    useEffect(() => {

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
      
      deletePropJobsSL();

      console.log("que tiene el SG company:", companyDataSG);
      console.log("que tiene companyData:", companyData);

    }, []);    

    return(
        <div className={style.mainDiv}>

            {/* {profileImageDropzone && <ImageDropzone className={style.dropzone} handleCancelButton={handleImageChangeButton} handleImageChange={handleImageChange}/>} */}

            <div className={style.profilePictureBasicInfoContainer}>
                {/* ENCABEZADO */}
                <div className={style.header}>
                    <Title>{companyData.companyName}</Title>
                </div>
                {/* IMAGEN */}
                <div className={style.profilePictureContainer}>
                    <img 
                        src={companyData.image} 
                        alt="gatito" 
                        className={style.profilePicture}/>
                    {/* {isProfileOwner && <button className={style.imageChangeButton} onClick={() => handleImageChangeButton()}><FaCameraRotate className={style.buttonIcon}/></button>} */}
                </div>
                {/* PERFIL */}
                <div className={style.userBasicInfoContainer}>
                    {/* MODO EDICION */}
                    {isEditing.profile ? (
                        <div >
                            {/* <label>Contraseña: </label><br/>
                                <TextInput 
                                //className={style.headerEditionInput} 
                                type="text" name="profile.company_name" 
                                value={companyData.companyName} 
                            onChange={handleInputChange}/> */}
                            <label>Nombre de empresa: </label><br/>
                                <TextInput 
                                    type="text" name="companyName" 
                                    value={companyData.companyName} 
                                    onChange={handleInputChange}/>
                            <label>Nombre de usuario: </label><br/>
                                <TextInput 
                                    type="text" name="username" 
                                    value={companyData.username} 
                                    onChange={handleInputChange}/>
                            <label>Ciudad: </label><br/>
                                <TextInput 
                                    type="text" name="city" 
                                    value={companyData.city} 
                                    onChange={handleInputChange}/>
                            <label>Pais: </label><br/>
                                <Select
                                    name="country"
                                    value={companyData.country}
                                    onValueChange={(value)=>handleSelectChange("country",value)}
                                    placeholder="--seleccione opcion--"
                                >
                                    {
                                    countrys?.map((country, index) => (
                                        <SelectItem key={index} value={country.name}>
                                        {country.name}
                                        </SelectItem>
                                    ))
                                    }
                                </Select>                                    
                            <label>Sitio Web: </label><br/>        
                                <TextInput 
                                    type="text" name="profile.website" 
                                    //value={userData.profile.website} 
                                    //onChange={handleInputChange}
                                    />
                            <label>Cuit: </label><br/>
                                <TextInput 
                                    type="text" name="cuit" 
                                    value={companyData.cuit} 
                                    onChange={handleInputChange}/>
                            <label>Email: </label><br/>
                                <TextInput 
                                    type="text" name="email" 
                                    value={companyData.email} 
                                    onChange={handleInputChange}/>
                            <label>Url Imagen: </label><br/>
                                <TextInput 
                                    type="text" name="image" 
                                    value={companyData.image} 
                                    onChange={handleInputChange}/>
                            <label>Bio de la empresa: </label><br/>
                                <textarea
                                className={style.headerEditionTextarea} 
                                name="bio" 
                                value={companyData.bio} 
                                onChange={handleInputChange}/><br/>
                            
                        </div>
                    ):(
                        //MODO VISUALIZACION DE DATOS
                        <div className={style.infoContainer}>
                            {/* <p className={style.userInfoName}>{companyDataSG.companyName}</p> */}
                            <Subtitle>Informacion de la empresa:</Subtitle>
                            <p>{companyData.city}, {companyData.country}</p>
                            {/* <p>{companyDataSG.website}</p> */}
                            <p>cuit: {companyData.cuit}</p>
                            <p>email : {companyData.email}</p>
                            <p>"bio: {companyData.bio}"</p>
                        </div>
                    )}

                    {isProfileOwner && 
                        <div className={style.headerButtonContainer}>
                            {isEditing.profile 
                                ? <div>
                                    {/* <button className={style.cancelButton} onClick={() => handleCancelButton("profile")}><FaRectangleXmark className={style.buttonIcon}/></button> */}
                                    <button className={style.saveButton} onClick={() => handleSaveButton("profile")}><FaFloppyDisk className={style.buttonIcon}/></button>
                                </div>
                                :(
                                <button className={style.editionButton} onClick={() => handleProfileEditButton()}><FaPenToSquare className={style.buttonIcon}/></button>
                            )}
                        </div>
                    }
                </div>

            </div>

        </div> 
            
    )
=======
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

    const [isProfileOwner, setIsProfileOwner] = useState(false);
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
                                    onChange={handleInputChange}/>
                            <label>Ciudad: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.city" 
                                    value={userData.profile.city} 
                                    onChange={handleInputChange}/>
                            <label>Pais: </label><br/>
                                <Select
                                    name="profile.country"
                                    value={userData.profile.country}
                                    onValueChange={handleInputChange}
                                    placeholder="--seleccione opcion--"
                                >
                                    {
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
                                    onChange={handleInputChange}/>
                            <label>Cuit: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.cuit" 
                                    value={userData.profile.cuit} 
                                    onChange={handleInputChange}/>
                            <label>Email: </label><br/>
                                <TextInput 
                                    //className={style.headerEditionInput} 
                                    type="text" name="profile.email" 
                                    value={userData.profile.email} 
                                    onChange={handleInputChange}/>
                            <label>Bio de la empresa: </label><br/>
                                <textarea
                                className={style.headerEditionInput} 
                                name="profile.bio" 
                                rows="30" cols="80"
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
>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558
};