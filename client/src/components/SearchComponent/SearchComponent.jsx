import style from "./SearchComponent.module.css"
import { useState } from "react";
import {FaMagnifyingGlass} from "react-icons/fa6"
import { useNavigate } from "react-router";

const SearchComponent = () =>{

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchButton = () => {
        {/* AGREGAR ACTION */}
        navigate("/Trends_app_MVP/home")
    }

    return(
        <div className={style.searchComponentContainer}>
            <input 
                type="text" 
                className={style.searchInput} 
                value={searchTerm} 
                onChange={handleSearchInput}
            />
            <button className={style.searchButton} onClick={handleSearchButton}>
                <FaMagnifyingGlass/>
            </button>
        </div>
    )
}

export default SearchComponent;