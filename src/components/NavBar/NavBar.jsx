import style from "./NavBar.module.css"
import {NavLink} from "react-router-dom"
import {FaMagnifyingGlass, FaRegUser, FaComments, FaPeopleGroup, FaRobot, FaRightFromBracket} from "react-icons/fa6"
import SearchComponent from "../SearchComponent/SearchComponent"
import { useState } from "react"

const NavBar = () =>{
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchButton = () =>{
        setIsSearchActive(!isSearchActive);
    }

    return(
        <div className={style.navBarContainer}>

            {isSearchActive && <SearchComponent/>}

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


            <button className={style.navBarButtonContainer}>
                <FaRightFromBracket className={style.buttonIcon}/>
                <p className={style.buttonText}>Salir</p>
            </button>
        </div>
    )
}

export default NavBar;