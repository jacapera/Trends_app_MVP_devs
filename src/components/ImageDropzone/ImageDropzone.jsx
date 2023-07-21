import { useCallback } from "react";
import style from "./ImageDropzone.module.css"
import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";

const ImageDropzone = ({ handleCancelButton, handleImageChange }) => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ unit: "px", width: 500, height: 500 });

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

    const handleUploadButton = () =>{
        handleImageChange(image.preview);
        handleCancelButton();
    }

    return (
        <div className={style.mainDiv}>
            <div className={style.blackContainer} onClick={() => handleCancelButton()}></div>
            <div className={style.whiteContainer}>
                {image ? (
                    <div className={style.previewImageContainer}>
                        <img src={image.preview} className={style.previewImage} />
                        <button className={style.previewImageDeleteButton} onClick={() => handleImageDeleteButton()}>X</button>
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
                <div className={style.buttonDiv}>
                    <button className={style.saveButton} onClick={() => handleUploadButton()}>SUBIR</button>
                    <button className={style.cancelButton} onClick={() => handleCancelButton()}>CANCELAR</button>
                </div>
            </div>
        </div>
    );
}

export default ImageDropzone;