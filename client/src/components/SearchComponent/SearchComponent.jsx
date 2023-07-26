import style from "./SearchComponent.module.css"
import {FaMagnifyingGlass} from "react-icons/fa6"

const SearchComponent = () =>{
    return(
        <div className={style.searchComponentContainer}>
            <input type="text" className={style.searchInput}/>
            <button className={style.searchButton}><FaMagnifyingGlass/></button>
        </div>
    )
}

export default SearchComponent;