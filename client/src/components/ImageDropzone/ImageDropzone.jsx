import { useCallback } from "react";
import style from "./ImageDropzone.module.css"
import { useState } from 'react';
import { useDropzone } from "react-dropzone";

const ImageDropzone = ({type, handleCancelButton, userData}) => {
    const [image, setImage] = useState(null);
    const [editData, setEditData] = useState(userData);

    const onDrop = useCallback(acceptedFiles => {
        const selectedImage = acceptedFiles[0]; // Get the first image from the accepted files array
        setImage({
            file: selectedImage,
            preview: URL.createObjectURL(selectedImage)
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleImageDeleteButton = () =>{
        setImage(null);
    }

    const handleUploadButton = () => {
        setEditData((prevState) => ({
            ...prevState, 
            profile: { 
                ...prevState.profile, 
                image: image.preview} 
            }))
        
    }

    const saveChanges = (event) => {
        event.preventDefault();
        console.log("save");
        userData = editData
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        const array = name.split(".");
        const newUserData = {...editData};
        newUserData[array[0]][array[1]] = value;
        setEditData(newUserData)
        console.log(newUserData);
      }

    

    return (
        <div className={style.mainDiv}>
            <div className={style.blackContainer} onClick={() => handleCancelButton()}></div>
            {type === "photo" ?  (
            <div className={style.whiteContainer}>
                <div className={style.TopContainer}>
                    <h2 className={style.Title}>Add or edit photo</h2>
                    <button onClick={handleCancelButton}>X</button>
                </div>

                <div className={style.ImageContainer}>
                    {image ? (
                        <div className={style.previewImageContainer}>
                            <div className={style.Background}>
                                <img src={image.preview} className={style.previewImage} />
                                <button className={style.previewImageDeleteButton} onClick={() => handleImageDeleteButton()}>X</button>
                            </div>
                        </div>
                    ) : (
                        <div {...getRootProps()} className={style.dropzoneBox}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className={style.dropzoneText}>Suelta tu foto aquí...</p>
                            ) : (
                                <p className={style.dropzoneText}>Arrastra y suelta una foto aquí.</p>
                            )}
                        </div>
                    )}

                </div>
                <div className={style.buttonDiv}>
                    <button className={style.saveButton} onClick={handleUploadButton}>SUBIR</button>
                    <button className={style.cancelButton} onClick={ handleCancelButton}>CANCELAR</button>
                </div>
            </div>

            ): (
                <div className={`${style.whiteContainer} ${style.GeneralContainer}`}>
                <div className={style.TopContainer}>
                    <h2 className={style.Title}>Add or edit photo</h2>
                    <button onClick={handleCancelButton}>X</button>
                </div>
                <form onSubmit={saveChanges}>
                    <div className={`${style.ImageContainer} ${style.InfoContainer}`}>
                            <div className={style.Option}>
                                <label htmlFor="userName"> Username*</label>
                                <input
                                defaultValue={editData.profile.username} 
                                name="profile.username" 
                                id="userName" 
                                type="text"
                                onChange={handleOnChange}
                                />
                            </div>
                            <div className={style.Option}>
                                <label htmlFor="Name"> Name*</label>
                                <input 
                                defaultValue={editData.profile.name} 
                                name="profile.name" 
                                id="Name" 
                                onChange={handleOnChange}
                                type="text"
                                />
                            </div>

                            <div className={style.Option}>
                                <label htmlFor="skills"> Skills*</label>
                                <input 
                                defaultValue={editData.info.skills} 
                                name="info.skills" 
                                onChange={handleOnChange}
                                id="skills" 
                                type="text" />
                            </div> 

                            <div className={style.Option}>
                                <label htmlFor="country"> Country*</label>
                                <input 
                                defaultValue={editData.profile.country} 
                                name="profile.country" 
                                onChange={handleOnChange}
                                id="country" 
                                type="text" />
                            </div>
                            <div className={style.Option}>
                                <label htmlFor="city"> City*</label>
                                <input 
                                defaultValue={editData.profile.city} 
                                name="profile.city" 
                                onChange={handleOnChange}
                                id="city" 
                                type="text" />
                            </div>
                            <div className={style.Option}>
                                <label htmlFor="biography">Biography</label>
                                <textarea
                                className={style.BioInput} 
                                defaultValue={editData.profile.bio} 
                                name="profile.bio" 
                                onChange={handleOnChange}
                                id="biography" 
                                type="text" />
                            </div>
                            <h4 className={style.SubTitle}>Academic</h4>
                            <div className={style.Option}>
                                <label htmlFor="type">Type</label>
                                <input 
                                defaultValue={editData.academic.type} 
                                name="academic.type" 
                                id="type" 
                                type="text" />
                            </div>
                            <div className={style.Option}>
                                <label htmlFor="institution">institution</label>
                                <input 
                                defaultValue={editData.academic.institution} 
                                name="academic.institution" 
                                onChange={handleOnChange}
                                id="institution" 
                                type="text" />
                            </div>
                            <div className={style.Option}>
                                <label htmlFor="institution">Level</label>
                                <input 
                                defaultValue={editData.academic.level} 
                                name="academic.level" 
                                onChange={handleOnChange}
                                id="institution" 
                                type="text" />
                            </div>
                    </div>
                    <div className={style.buttonDiv}>
                        <button className={style.saveButton} type="submit">SUBIR</button>
                        <button className={style.cancelButton} onClick={ handleCancelButton}>CANCELAR</button>
                    </div>
                </form>
            </div>
            )
            }
        </div>
    );
}

export default ImageDropzone;
