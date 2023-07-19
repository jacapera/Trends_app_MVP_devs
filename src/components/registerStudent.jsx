import { useEffect, useState } from "react";
import formatRegisterStudent from "../utils/formatRegisterStudent";
import { Button, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";



export default function registerStudent() {

	const[page,setPage]=useState({
		button1:"Prev",
		button1_hide:true,
		button2:"Continue",
		button2_hide:false,
		div_contact:false,
		div_academico:true,
		div_interest:true
	});

	const[completo, setCompleto] = useState(false);

	const handlePage=(event)=>{
		console.log("presiona boton")
		if(!page.div_contact){
			//SI estamos en PAGINA CONTACTO
			console.log("entra a div_contact")
			setPage({
				button1:"Prev",
				button1_hide:false,
				button2:"Continue",
				button2_hide:false,
				div_contact:true,
				div_academico:false, //muestra academico
				div_interest:true
			})
			
		}else if(!page.div_academico){
			//SI estamos en PAGINA ACADEMICO
			console.log("entra a div_academico")
			if(event.target.name=="prev"){
				//si presiono prev -> voy a contacto
				setPage({
					button1:"Prev",
					button1_hide:true,
					button2:"Continue",
					button2_hide:false,
					div_contact:false, //muestra contacto
					div_academico:true,
					div_interest:true 
				})			
			}
			if(event.target.name==="continue"){
				//si presiono continue -> voy a interest
				setPage({
					button1:"Prev",
					button1_hide:false,
					button2:"Continue",
					button2_hide:true,
					div_contact:true,
					div_academico:true,
					div_interest:false //muestra interest
				})			
			}
			//
		}else if(!page.div_interest){
			//SI estamos en PAGINA INTEREST
			console.log("entra a div_interest")
			//
			setPage({
				button1:"Prev",
				button1_hide:false,
				button2:"Continue",
				button2_hide:false,
				div_contact:true,
				div_academico:false,//muestra academic
				div_interest:true
			})			
		}
	}

	const[data, setData] = useState(null);

	const[progress, SetProgress] = useState(0);

	const[profile, setProfile] = useState({
		name:"",
		lastname:"",
		dni:"",
		email:"",
		gender:"",
		city:"",
		country:"",
		username:"",
		password:"",
		professional_support:false, //si / no
		//academico
		type_student:"", //Secundaria - Universitario Junior - Universitario intermedio - Universitario Avanzado
		level:"",
		institution:"",
		study_area:"",
		planned_graduation:"",
		//intereses
		career_interest:"",
		skills:"",
		interests: "",
		goals:"", //desplegar lista
    	languages: "",
    	availability: "",
    	contract: "",		
	});

	const [error,setError] = useState({
		name:"",
		lastname:"",
	});

	const handleChangeProfile =(event) =>{
		// console.log("que viene en event: ", event)
		const {name,value,checked} = event.target;
		if(name==="professional_support"){
			//console.log("como esta checked: ", checked)
			setProfile({
				...profile,
				[name]:checked
			});
		}else{
			setProfile({
				...profile,
				[name]:value
			});
			validate({
				...profile,
				[name]:value
			},name, value);
		}
	};
	const handleChangeSelect=(prop,value)=>{
		//console.log("que trae value: ", value)
		setProfile({...profile,[prop]:value})
	};

	const validate = (profile, name, value)=>{
		const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if(name==="name"){
            if(/[0-9]/.test(profile.name)){
                setError({...error,name:"Error: el Nombre no puede contener numeros"});
            } else setError({...error,name:""});
		};

		if(name==="lastname"){
			if(/[0-9]/.test(profile.lastname)){
				setError({...error,lastname:"Error: el Apellido no puede contener numeros"});
			} else setError({...error,lastname:""});
		};

		if(name==="dni"){
			const inputValue = value;
			const dniNumber = inputValue.replace(/\D/g, '');
			setProfile({
				...profile,
				dni:dniNumber
			})
		};

		if(name==="email"){
            if (!regexEmail.test(profile.email)) {
                error.email="Debe ingresar un mail valido"
            }else{
                setError({...error,email:""})
            }
			if(value==="") setError({...error,email:""})
		};

		if(name==="username"){
			const inputValue = value;
			const user = inputValue.replace(' ', '');
			setProfile({
				...profile,
				username:user
			})
		};

		if(name==="password"){
			const inputValue = value;
			const pass = inputValue.replace(' ', '');
			setProfile({
				...profile,
				password:pass
			})
		};	

		//valida que sea un año correcto
		if(name==="planned_graduation"){
			console.log("ingrea a planned_graduation, value", value)
			if(value<1900 || value>2999){
				setError({...error, planned_graduation:"Ingrese un año valido"})
			}else{
				setError({...error,planned_graduation:""})
			}
		}
	};

	//valida que todos los campos esten cargados y no existan errores
	const validateComplete = ()=>{
		for(let propiedad in profile){
			if(profile[propiedad] === "") return false;
		}
		for(let propiedad in error){
			if(error[propiedad]!=="") return false;
		}
		return true;
	};

	//Presiono boton submit
	const submitHandler =(event)=>{
		event.preventDefault();
		console.log("que tiene profile antes de enviar: ", profile);
		//formateo datos a enviar objeto.
		const studentFormated = formatRegisterStudent(profile);
		console.log("como trae formatRegisterStudent: ",studentFormated);
	};

	useEffect(()=>{
		console.log("que tiene profile: ", profile);
		console.log("que tiene error: ", error)
		console.log("que tiene data: ", data);
		//calculo progreso
		const totalField = Object.keys(profile).length;
		const completedFields = Object.values(profile).filter((value)=>value!=='').length;
		const currentProgress = (completedFields/totalField) * 100;
		SetProgress(currentProgress);

		console.log("que tienen progress: ", progress);

		//setea estado 
		setCompleto(validateComplete())

	},[profile],[error],[data],[progress]);

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

	return (
		<div>
			<h1>Registro Estudiante</h1>
			<form onSubmit={submitHandler}>
				{/* PERFIL */}
				<div className="Perfil" hidden={page.div_contact}>
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

				{/* INFORMACION ACADEMICA */}
				<div className="academic" hidden={page.div_academico}>
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

				{/* INTERESES */}
				<div hidden={page.div_interest}>
					<h3>Intereses</h3>
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
					<label>Objetivos: </label><br/>
					<TextInput
						name="goals"
						type="text"
						placeholder="Ingrese objetivos separados por comas"
						value={profile.goals}
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
				<div>
					<Button 
						disabled={!completo} 
						type="submit"
						style={{ margin: 10, padding: 10 }}
						>Guardar Registro</Button>
				</div>
			</form>
			<br/>
			<div>
				<button 
					name="prev" 
					hidden={page.button1_hide} 
					onClick={handlePage}
					style={{ margin: 10, padding: 10 }}
					>{page.button1}</button>
				<button 
					name="continue" 
					hidden={page.button2_hide} 
					onClick={handlePage}
					style={{ margin: 10, padding: 10 }}
					>{page.button2}</button>
			</div>
			<div>
				<label>progreso: </label>
				<progress id="profile" max="100" value={progress}>{progress}</progress>
			</div>

		</div>
	);
}