import { useEffect, useState } from "react";
import { Button, Italic, Select, SelectItem, TextInput, Title, MultiSelect, MultiSelectItem } from "@tremor/react";


export default function studentRegisterContact({profile,error,handleChangeSelect,handleChangeProfile}){

    const[data, setData] = useState(null);

    console.log("que trae profile: ", profile);

	useEffect(()=>{
		const fetchdata = async ()=>{
			try{
				const response = await fetch('../src/data/data.json');
				const jsonData = await response.json();
				console.log("que trae jsonData: ", jsonData);
				setData(jsonData);
			}catch(error){
				console.log("error al leer data.json: ", error.message);
			}
		}
		fetchdata();
	},[]) 

    return(
        <div>
            {/* CONTACTO */}
            	    <Title>Informacion de Contacto</Title>
					<label>Nombre: </label><br/>
					<TextInput
						name="name"
						type="text"
						value={profile.name}
						onChange={handleChangeProfile}
					></TextInput>
					{error.name && <label style={{color:"red"}}><Italic>{error.name}</Italic></label>}
					<br/>
					<label>Apellido: </label><br/>
					<TextInput
						name="lastname"
						type="text"
						value={profile.lastname}
						onChange={handleChangeProfile}						
					></TextInput>
					{error.lastname && <label style={{color:"red"}}><Italic>{error.lastname}</Italic></label>}
					<br/>
					<label>DNI: </label><br/>
					<TextInput
						name="dni"
						type="text"
						value={profile.dni}
						onChange={handleChangeProfile}						
					></TextInput><br/>
					<label>Email: </label><br/>
					<TextInput
						name="email"
						type="text"
						value={profile.email}
						onChange={handleChangeProfile}						
					></TextInput>
					{error.email && <label style={{color:"red"}}><Italic>{error.email}</Italic></label>}
					<br/>
					<label>Genero: </label><br/>
					<Select
						name="gender"
						value={profile.gender}
						onValueChange={(value)=>handleChangeSelect("gender",value)}
						placeholder="--Seleccione Opcion---"
					>
						{
							data?.gender.map((gen,index)=>(
								<SelectItem key={index} value={gen.value} >{gen.value}</SelectItem>
							))
						}
					</Select><br/>
					<label>Ciudad de Residencia: </label><br/>
					<TextInput
						name="city"
						type="text"
						value={profile.city}
						onChange={handleChangeProfile}						
					></TextInput><br/>
					<label>Pais de Residencia: </label><br/>
					<Select
						name="country"
						value={profile.country}
						onChange={(value)=>handleChangeSelect("country",value)}
						placeholder="--Seleccione Opcion--"
					>
						{
							data?.country.map((country,index)=>(
								<SelectItem key={index} value={country.value}>{country.value}</SelectItem>
							))
						}
					</Select><br/>					

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
					<label>Apoyo de profesionales con experiencia:</label>
					<TextInput
						name="professional_support"
						type="checkbox"						
						value={profile.professional_support}
						onChange={handleChangeProfile}
					></TextInput><br/>
        </div>
    )
}