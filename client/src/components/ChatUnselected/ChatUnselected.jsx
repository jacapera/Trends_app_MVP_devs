import style from "./ChatUnselected.module.css"

const ChatUnselected = () => {
  return (
    <div className={style.mainContainer}>
        <p className={style.logo}>#</p>
        <p className={style.disclaimer}>Selecciona un usuario de la lista o empieza una nueva conversacion!</p>
    </div>
  )
}

export default ChatUnselected;