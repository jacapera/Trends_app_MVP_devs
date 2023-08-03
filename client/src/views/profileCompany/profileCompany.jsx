import { useEffect, useState } from "react";
import style from "./profileCompany.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import {FaGraduationCap, FaLocationDot, FaBriefcase, FaCameraRotate, FaPenToSquare, FaFloppyDisk , FaRectangleXmark} from "react-icons/fa6";
import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import { useSelector } from "react-redux";
import axios from "axios";
const {VITE_URL} = import.meta.env;


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
        //const URL = `${VITE_URL}/api/v1/search/user`;
        const ID = companyData.id;
        const URL = `${VITE_URL}/api/v1/user/${ID}`;
        //envio datos
        try{
            console.log("ACTUALIZO DATOS EMPRESA", companyData)
            console.log("como envia a put: ", URL)
            await axios.put(URL,companyData)
            .then(async res=>{
               alert(res.data) 
            })
            
        }catch(error){
            console.log(error.message);
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
                    <h1>Company</h1>                    
                </div>
                {/* IMAGEN */}
                <div className={style.imageContainer}>
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
                                value={companyData.name} 
                            onChange={handleInputChange}/> */}
                            <h3>Nombre de empresa: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="name" 
                                    value={companyData.name} 
                                    onChange={handleInputChange}/>
                            <h3>Nombre de usuario: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="username" 
                                    value={companyData.username} 
                                    onChange={handleInputChange}/>
                            <h3>Ciudad: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="city" 
                                    value={companyData.city} 
                                    onChange={handleInputChange}/>
                            <h3>Pais: </h3>
                                <Select
                                    className={style.input}
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
                            <h3>Sitio Web: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="profile.website" 
                                    //value={userData.profile.website} 
                                    //onChange={handleInputChange}
                                    />
                            <h3>Cuit: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="cuit" 
                                    value={companyData.cuit} 
                                    onChange={handleInputChange}/>
                            <h3>Email: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="email" 
                                    value={companyData.email} 
                                    onChange={handleInputChange}/>
                            <h3>Url Imagen: </h3>
                                <TextInput 
                                    className={style.input}
                                    type="text" name="image" 
                                    value={companyData.image} 
                                    onChange={handleInputChange}/>
                            <h3>Bio de la empresa: </h3>
                                <textarea
                                className={style.headerEditionTextarea} 
                                name="bio" 
                                value={companyData.bio} 
                                onChange={handleInputChange}/>
                            
                        </div>
                    ):(
                        //MODO VISUALIZACION DE DATOS
                        <div className={style.infoContainer}>
                            <h1>{companyData.name}</h1>
                            <h3>{companyData.city}, {companyData.country}</h3>
                            {/* <p>{companyDataSG.website}</p> */}
                            <h3>cuit: {companyData.cuit}</h3>
                            <h3>email : {companyData.email}</h3>
                            <hr></hr>
                            <h3>{companyData.bio}</h3>
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
};