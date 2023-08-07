import { useState, useRef } from "react";
import style from "./ChatNewGroup.module.css";

const ChatNewGroup = () => {

  const [groupImage, setGroupImage] = useState(
    "https://archive.org/download/placeholder-image/placeholder-image.jpg"
  );
  const [groupName, setGroupName] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form className={style.mainContainer}>
      <img
        src={groupImage}
        alt="group-image"
        className={style.groupImage}
        onClick={handleImageClick}
      />
      <div className={style.inputDiv}>
        <input
          placeholder="Nombre del grupo"
          className={style.input}
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <button className={style.createButton}>Crear grupo</button>
    </form>
  );
};

export default ChatNewGroup;