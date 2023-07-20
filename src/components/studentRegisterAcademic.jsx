import { useEffect, useState } from "react";
import { Button, Italic, Select, SelectItem, TextInput, Title, MultiSelect, MultiSelectItem } from "@tremor/react";


export default function studentRegisterAcademic({profile,error,handleChangeSelect,handleChangeProfile}){

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
					<h3>Informacion Academica</h3>
					<label>Tipo de Estudiante: </label><br/>
					<Select
						name="type_student"
						value={profile.type_student}
						onChange={(value)=>handleChangeSelect("type_student",value)}
						placeholder="--Seleccione opcion--"
					>
						{
							data?.typeStudent.map((type,index)=>(
								<SelectItem key={index} value={type.value}>{type.value}</SelectItem>
							))
						}
					</Select><br/>

					<label>Institucion: </label><br/>
					<TextInput
						name="institution"
						type="text"
						value={profile.institution}
						onChange={handleChangeProfile}						
					></TextInput><br/>

					<label>Nivel educativo: </label><br/>
					<Select
						name="level"
						value={profile.level}
						onChange={(value)=>handleChangeSelect("level",value)}
						placeholder="--seleccione opcion--"
					>
						{
							data?.levelStudent.map((level,index)=>(
								<SelectItem key={index} value={level.value}>{level.value}</SelectItem>
							))
						}
					</Select>
					<br/>
					<label>Area de Estudio: </label><br/>
					<TextInput
						name="study_area"
						type="text"
						placeholder="Ingrese areas separadas por comas"
						value={profile.study_area}
						onChange={handleChangeProfile}							
					></TextInput><br/>
					<label>Año graduacion prevista: </label><br/>
					<TextInput
						name="planned_graduation"
						type="number"
						placeholder="ejemplo: 2023"
						value={profile.planned_graduation}
						onChange={handleChangeProfile}							
					></TextInput><br/>
					{error.planned_graduation && <label style={{color:"red"}}><Italic>{error.planned_graduation}</Italic></label>}
					<br/>		
        </div>
    )
}