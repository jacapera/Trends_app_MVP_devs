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
};