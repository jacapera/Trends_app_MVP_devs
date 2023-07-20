import { useEffect, useState } from "react";
import { Button, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";

export default function companyRegisterContact({formCompany,error,handleChangeSelect,handleChangeForm}){

    const[data, setData] = useState(null);

    useEffect(()=>{
		const fetchdata = async ()=>{
			try{
				const response = await fetch('../src/data/data.json');
				const jsonData = await response.json();
				//console.log("que trae jsonData: ", jsonData);
				setData(jsonData);
			}catch(error){
				console.log("error al leer data.json: ", error.message);
			}
		}
		fetchdata();
	},[]) 

    return(
        <div>
                    <Title>Informacion de Contacto</Title>
					<label>Nombre Empresa: </label><br/>
					<TextInput
						name="company_name"
						type="text"
						value={formCompany.company_name}
						onChange={handleChangeForm}
					></TextInput>
					{error.company_name && <label style={{color:"red"}}>{error.company_name}</label>}
					<br/>

					<label>CUIT: </label><br/>
					<TextInput
						name="cuit"
						type="text"
						value={formCompany.cuit}
						onChange={handleChangeForm}
						placeholder="ingrese solo numeros"
					></TextInput>
					{error.cuit && <label style={{color:"red"}}>{error.cuit}</label>}
					<br/>

					<label>email: </label><br/>
					<TextInput
						name="email"
						type="text"
						value={formCompany.email}
						onChange={handleChangeForm}
					></TextInput>
					{error.email && <label style={{color:"red"}}>{error.email}</label>}
					<br/>

					<label>ciudad: </label><br/>
					<TextInput
						name="city"
						type="text"
						value={formCompany.city}
						onChange={handleChangeForm}
					></TextInput>
					{error.city && <label style={{color:"red"}}>{error.city}</label>}
					<br/>

					<label>pais: </label><br/>
                    <Select
						name="country"
						value={formCompany.country}
						onValueChange={(value)=>handleChangeSelect("country",value)}
						placeholder="--seleccione opcion--"
                    >
                        {
                            data?.country.map((country,index)=>(
                                <SelectItem key={index} value={country.value}>{country.value}</SelectItem>
                            ))
                        }
                    </Select>					
					{error.country && <label style={{color:"red"}}>{error.country}</label>}
					<br/>

					<label>Sitio Web: </label><br/>
					<TextInput
						name="website"
						type="text"
						value={formCompany.website}
						onChange={handleChangeForm}
					></TextInput>
					{error.website && <label style={{color:"red"}}>{error.website}</label>}
					<br/>

					<label>usuario: </label><br/>
					<TextInput
						name="usuario"
						type="text"
						value={formCompany.usuario}
						onChange={handleChangeForm}
					></TextInput>
					{error.usuario && <label style={{color:"red"}}>{error.usuario}</label>}
					<br/> 

					<label>contraseña: </label><br/>
					<TextInput
						name="password"
						type="password"
						value={formCompany.password}
						onChange={handleChangeForm}
					></TextInput>
					{error.password && <label style={{color:"red"}}>{error.password}</label>}
					<br/> 
        </div>
    )
}