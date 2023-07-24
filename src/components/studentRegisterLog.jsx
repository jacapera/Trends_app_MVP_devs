import { useEffect, useState } from "react";
import { Button, Italic, Select, SelectItem, TextInput, Title, MultiSelect, MultiSelectItem } from "@tremor/react";


export default function studentRegisterLog({profile,error,handleChangeSelect,handleChangeProfile}){
    
    return(
        <div>
            		<label>Nombre de Usuario: </label><br/>
					<TextInput
						name="username"
						type="text"
						value={profile.username}
						onChange={handleChangeProfile}						
					></TextInput><br/>	
					<label>Contraseña: </label><br/>
					<TextInput
						name="password"
						type="password"
						value={profile.password}
						onChange={handleChangeProfile}
					></TextInput><br/>

        </div>
    )
};