import style from "./NavBar.module.css"
import {NavLink} from "react-router-dom"
import {FaMagnifyingGlass, FaRegUser, FaComments, FaPeopleGroup, FaRobot, FaRightFromBracket, FaMoon, FaSun} from "react-icons/fa6"
import SearchComponent from "../SearchComponent/SearchComponent"
import { useState } from "react"
import LoggoutConfirmation from "../LoggoutConfirmation/LoggoutConfirmation"

const NavBar = () =>{
    const [isSearchActive, setIsSearchActive] = useState(false);

    const [darkmode, setDarkmode] = useState(false);

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleSearchButton = () =>{
        setIsSearchActive(!isSearchActive);
    }

    const handleDarkmode = () =>{
        setDarkmode(!darkmode);
    }

    const handleLoggoutButton = () =>{
        setIsLoggingOut(!isLoggingOut);
    }

    return(
        <div className={style.navBarContainer}>

            {isSearchActive && <SearchComponent/>}

            {isLoggingOut && <LoggoutConfirmation handleCancelButton={handleLoggoutButton}/>}

            <div>
                <button className={isSearchActive ? style.navBarButtonContainerActive : style.navBarButtonContainer} onClick={() => handleSearchButton()}>
                    <FaMagnifyingGlass className={style.buttonIcon}/>
                    <p className={style.buttonText}>Buscar</p>
                </button>

                <NavLink>
                    <div className={style.navBarButtonContainer}>
                        <FaPeopleGroup className={style.buttonIcon}/>
                        <p className={style.buttonText}>Personas</p>
                    </div>
                </NavLink>

                <NavLink>
                    <div className={style.navBarButtonContainer}>
                        <FaComments className={style.buttonIcon}/>
                        <p className={style.buttonText}>Chats</p>
                    </div>
                </NavLink>

                <NavLink>
                    <div className={style.navBarButtonContainer}>
                        <FaRegUser className={style.buttonIcon}/>
                        <p className={style.buttonText}>Perfil</p>
                    </div>
                </NavLink>

                <NavLink>
                    <div className={style.navBarButtonContainer}>
                        <FaRobot className={style.buttonIcon}/>
                        <p className={style.buttonText}>Ayuda</p>
                    </div>
                </NavLink>
            </div>

            <div>
                <button  className={style.navBarButtonContainer} onClick={handleDarkmode}>
                    {darkmode ? 
                        <FaSun className={style.buttonIcon}/> :
                        <FaMoon className={style.buttonIcon}/>
                    }
                    <p className={style.buttonText}>Darkmode</p>
                </button>

                <button className={style.navBarButtonContainer} onClick={handleLoggoutButton}>
                    <FaRightFromBracket className={style.buttonIcon}/>
                    <p className={style.buttonText}>Salir</p>
                </button>
            </div>
        </div>
    )
}

export default NavBar;