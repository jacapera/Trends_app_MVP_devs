import { useEffect, useState } from "react";
import Validation from '../utils/validateFormCompany';
import { Button, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";
import formatRegisterCompany from "../utils/formatRegisterCompany";

export default function registerCompany() {

	const[completo, setCompleto] = useState(false);	

	const[page,setPage]=useState({
		button1:"Prev",
		button1_hide:true,
		button2:"Continue",
		button2_hide:false,
		div_contact:false,
		div_academico:true,
		div_interest:true
	});	

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
    
    const[formCompany, setFormCompany] = useState({
        company_name:"",
        cuit:"",
        email:"",
        city:"",
		country:"",
        website:"",
        usuario:"",
        password:"",
        //informacion academica
        level_required:"",
        study_area:"",
        experience_required:"",
        industry:"",
        benefits:"",
        //intereses
        skills_required:"",
        job_description:"",
        job_goal:"",
        languages_required:"",
        availability:"",
        contract_offered:"",
    });

    const[error,setError] = useState({});

    const handleChangeForm = (event) =>{
        const{name,value} = event.target;
        setFormCompany({
            ...formCompany,
            [name]:value
        });
        setError(Validation({
            ...formCompany,
            [name]:value
        }));
        restrict({
            ...formCompany,
            [name]:value
        },name,value)
    };

    const restrict = (form,name,value)=>{
        
        //cuit solo numeros
        if(name==="cuit"){
            const inputValue = value;
            const cuitNumber = inputValue.replace(/\D/g, '');
            setFormCompany({
                ...formCompany,
                cuit:cuitNumber
            });
        };

        //usuario sin espacios
		if(name==="usuario"){
			const inputValue = value;
			const user = inputValue.replace(' ', '');
			setFormCompany({
				...formCompany,
				usuario:user
			})
		};

        //password sin espacios
		if(name==="password"){
			const inputValue = value;
			const pass = inputValue.replace(' ', '');
			setFormCompany({
				...formCompany,
				password:pass
			})
		};

        //experiencia >1 y <100
        if(name==="experience_required"){
            if(Number(value)<1){
                setFormCompany({
                    ...formCompany,
                    experience_required:1
                })
            };
            if(Number(value)>100){
                setFormCompany({
                    ...formCompany,
                    experience_required:100
                })
            }
        }
    };

	const handleChangeSelect=(prop,value)=>{
		//console.log("que trae value: ", value)
		setFormCompany({...formCompany,[prop]:value})
	};

	const validateComplete = ()=>{
		for(let propiedad in formCompany){
			if(formCompany[propiedad] === "") return false;
		}
		for(let propiedad in error){
			if(error[propiedad]!=="") return false;
		}
		return true;
	};

	//presiono boton submit
	const submitHandler=(event)=>{
		event.preventDefault();
		console.log("que tiene formCompany antes de enviar: ", formCompany);
		//formateo datos a enviar objeto.
		const companyFormated = formatRegisterCompany(formCompany);
		console.log("como trae formatRegisterCompany: ",companyFormated);		
	}

    useEffect(()=>{
        console.log("que tiene formCompany: ",formCompany);
        console.log("que tiene error: ", error)
		console.log("que tiene data: ", data);      
		
		//setea estado
		setCompleto(validateComplete);

    },[formCompany],[error],[data])

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
            <form onSubmit={submitHandler}>
                {/* INFORMACION CONTACTO */}
                <div hidden={page.div_contact}>
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

                   {/* INFORMACION ACADEMICA */}
                <div hidden={page.div_academico}>
                    <Title>Informacion Academica</Title>
                   <label>Nivel educativo requerido: </label><br/>
                    <Select
						name="level_required"
						value={formCompany.level_required}
						onValueChange={(value)=>handleChangeSelect("level_required",value)}                        
						placeholder="--seleccione opcion--"
                    >
                        {
                            data?.levelStudent.map((level,index)=>(
                                <SelectItem key={index} value={level.value}>{level.value}</SelectItem>
                            ))
                        }
                    </Select>
					{error.level_required && <label style={{color:"red"}}>{error.level_required}</label>}
					<br/> 

					<label>¿Que areas la empresa busca incorporar personal? </label><br/>
					<TextInput
						name="study_area"
						type="text"
						value={formCompany.study_area}
						onChange={handleChangeForm}
						placeholder="ingrese areas separadas por comas"
					></TextInput>					
					{error.study_area && <label style={{color:"red"}}>{error.study_area}</label>}
					<br/> 

					<label>Experiencia requerida: </label><br/>
					<TextInput
						name="experience_required"
						type="number"
						value={formCompany.experience_required}
						onChange={handleChangeForm}
					></TextInput>
					{error.experience_required && <label style={{color:"red"}}>{error.experience_required}</label>}
					<br/> 

					<label>Area/Industria: </label><br/>
                    <Select
						name="industry"
						value={formCompany.industry}
						onValueChange={(value)=>handleChangeSelect("industry",value)}
                    >
                        {
                            data?.industry.map((area,index)=>(
                                <SelectItem key={index} value={area.value}>{area.value}</SelectItem>
                            ))
                        }
                    </Select>                    
					{error.industry && <label style={{color:"red"}}>{error.industry}</label>}
					<br/>                   
                </div>

                {/* INTERESES */}
                <div hidden={page.div_interest}>
                    <Title>Intereses</Title>
					<label>Beneficios otorgados: </label><br/>
					<TextInput
						name="benefits"
						type="text"
						value={formCompany.benefits}
						onChange={handleChangeForm}
						placeholder="ingrese beneficios separados por comas"
					></TextInput>

					{error.benefits && <label style={{color:"red"}}>{error.benefits}</label>}
					<br/>

                    <label>Habilidades requeridas: </label><br/>
					<TextInput
						name="skills_required"
						type="text"
						value={formCompany.skills_required}
						onChange={handleChangeForm}
						placeholder="ingrese habilidades separadas por comas"
					></TextInput>
					{error.skills_required && <label style={{color:"red"}}>{error.skills_required}</label>}
					<br/> 

                    <label>Descripcion y Responsabilidades del puesto: </label><br/>
					<TextInput
						name="job_description"
						type="text"
						value={formCompany.job_description}
						onChange={handleChangeForm}
						placeholder="ingrese descripcion separados por comas"
					></TextInput>
					{error.job_description && <label style={{color:"red"}}>{error.job_description}</label>}
					<br/>

                    <label>Objetivos y metas del trabajo propuesto: </label><br/>
					<TextInput
						name="job_goal"
						type="text"
						value={formCompany.job_goal}
						onChange={handleChangeForm}
						placeholder="ingrese objetivos separados por comas"
					></TextInput>
					{error.job_goal && <label style={{color:"red"}}>{error.job_goal}</label>}
					<br/>

                    <label>Idiomas Requeridos: </label><br/>
					<TextInput
						name="languages_required"
						type="text"
						value={formCompany.languages_required}
						onChange={handleChangeForm}
						placeholder="ingrese idiomas separados por comas"
					></TextInput>
					{error.languages_required && <label style={{color:"red"}}>{error.languages_required}</label>}
					<br/>

                    <label>Disponibilidad: </label><br/>
					{/* <TextInput
						name="availability"
						type="text"
						value={formCompany.availability}
						onChange={handleChangeForm}
					></TextInput> */}
                    <Select
						name="availability"
						value={formCompany.availability}
						onValueChange={(value)=>handleChangeSelect("availability",value)}
						placeholder="--seleccione una opcion---"
                    >
                        {
                            data?.availabilitys.map((availability,index)=>(
                                <SelectItem key={index} value={availability.value}>{availability.value}</SelectItem>
                            ))
                        }
                    </Select>   					
					{error.availability && <label style={{color:"red"}}>{error.availability}</label>}
					<br/>

                    <label>Tipo de Contratacion Ofrecida: </label><br/>
                    <Select
						name="contract_offered"
						value={formCompany.contract_offered}
						onValueChange={(value)=>handleChangeSelect("contract_offered",value)}
						placeholder="--seleccione opcion---"
                    >
                        {
                            data?.contracts.map((contract,index)=>(
                                <SelectItem key={index} value={contract.value}>{contract.value}</SelectItem>
                            ))
                        }
                    </Select>   					
					{error.contract_offered && <label style={{color:"red"}}>{error.contract_offered}</label>}
					<br/>

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

        </div>
    )
};