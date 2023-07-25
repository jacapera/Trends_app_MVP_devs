import { useEffect, useState } from "react";
import { Select, SelectItem, TextInput, Title } from "@tremor/react";
// import { Button, Italic, MultiSelect, MultiSelectItem } from "@tremor/react";


export default function StudentRegisterInterest({profile,error,handleChangeSelect,handleChangeProfile}){

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
					<Title>Intereses</Title>
					<label>Intereses de carrera: </label><br/>
					<TextInput
						name="career_interest"
						type="text"
						placeholder="Ingrese intereses separados por comas"
						value={profile.career_interest}
						onChange={handleChangeProfile}
					></TextInput><br/>
					<label>Habilidades relevantes: </label><br/>
					<TextInput
						name="skills"
						type="text"
						placeholder="Ingrese habilidades separadas por comas"
						value={profile.skills}
						onChange={handleChangeProfile}						
					></TextInput><br/>
					<label>Intereses: </label><br/>
					<TextInput
						name="interests"
						type="text"
						placeholder="Ingrese intereses separados por comas"
						value={profile.interests}
						onChange={handleChangeProfile}
					></TextInput><br/>

					<label>Idiomas: </label><br/>
					<TextInput
						name="languages"
						type="text"
						placeholder="Ingrese idiomas separados por comas"
						value={profile.languages}
						onChange={handleChangeProfile}							
					></TextInput><br/>
					<label>Disponibilidad: </label><br/>
					<Select
						name="availability"
						value={profile.availability}
						onChange={(value)=>handleChangeSelect("availability", value)}
						placeholder="--seleccione opcion--"
					>
						{
							data?.availabilitys.map((availability,index)=>(
								<SelectItem key={index} value={availability.value}>{availability.value}</SelectItem>
							))
						}
					</Select><br/>

					<label>Tipo de contratacion buscada: </label><br/>
					<Select
						name="contract"
						value={profile.contract}
						onChange={(value)=>handleChangeSelect("contract", value)}
						placeholder="--seleccione opcion--"
					>
						{
							data?.contracts.map((contract,index)=>(
								<SelectItem key={index} value={contract.value}>{contract.value}</SelectItem>
							))
						}
					</Select><br/>
        </div>
    )
}