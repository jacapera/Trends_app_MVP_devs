import style from './LoggoutConfirmation.module.css'

const LoggoutConfirmation = ({handleCancelButton}) =>{
    return(
        <div className={style.confirmationContainer}>
            <div className={style.backgroundDiv} onClick={()=>handleCancelButton()}></div>

            <div className={style.confirmationDiv}>
                <p className={style.confirmationMessage}>
                    ¿Estás seguro que quieres cerrar sesión?
                </p>
                <div className={style.buttonContainer}>
                    <button className={style.loggoutButton}>
                        Cerrar sesión
                    </button>
                    <button className={style.cancelButton} onClick={()=>handleCancelButton()}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoggoutConfirmation;