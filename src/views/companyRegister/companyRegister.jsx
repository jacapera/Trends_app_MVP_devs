import { useEffect, useState } from "react";
import Validation from '../../utils/validateFormCompany';
import { Button, Italic, Select, SelectItem, TextInput, Title } from "@tremor/react";
import formatRegisterCompany from "../../utils/formatRegisterCompany";
import CompanyRegisterAcademic from "../../components/companyRegisterAcademic";
import CompanyRegisterInfo from "../../components/companyRegisterInfo";
import CompanyRegisterContact from "../../components/companyRegisterContact";
import {HiOutlineCheckCircle,HiOutlineMinusCircle} from 'react-icons/hi';
import { Icon } from "@tremor/react";
import {validateContact , errorContact , validateAcademic , errorAcademic,validateInfo,errorInfo} from "../../utils/validate";


export default function registerCompany() {

	const[isContactComplete, setIsContactComplete] = useState(false);
	const[isAcademicComplete, setIsAcademicComplete] = useState(false);
	const[isInfoComplete, setIsInfoComplete] = useState(false);

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
        //info
        benefits:"",
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
		//console.log("que tiene data: ", data);      

		//validacion de contacto y error contacto
		setIsContactComplete(validateContact(formCompany)&&errorContact(error));
		console.log("que trae isContactComplete: ", isContactComplete)
		
		//validacion de academic y error academic
		setIsAcademicComplete(validateAcademic(formCompany)&&errorAcademic(error));
		
		//validacion de info y error info
		setIsInfoComplete(validateInfo(formCompany)&&errorInfo(error));

    },[formCompany],[error],[data]);


	

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
			<h1>Registo de Empresas</h1>
            <form onSubmit={submitHandler}>
                {/* INFORMACION CONTACTO */}
                <div hidden={page.div_contact}>
					<CompanyRegisterContact  formCompany={formCompany} error={error} handleChangeSelect={handleChangeSelect} handleChangeForm={handleChangeForm} />
                </div>

                   {/* INFORMACION ACADEMICA */}
                <div hidden={page.div_academico}>
					<CompanyRegisterAcademic formCompany={formCompany} error={error} handleChangeSelect={handleChangeSelect} handleChangeForm={handleChangeForm} />
                </div>

                {/* INFO */}
                <div hidden={page.div_interest}>
					<CompanyRegisterInfo  formCompany={formCompany} error={error} handleChangeSelect={handleChangeSelect} handleChangeForm={handleChangeForm} />
                </div>
				<div>
					<Button 
						disabled={!(isContactComplete&&isAcademicComplete&&isInfoComplete)}
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
				{isContactComplete
					?<Icon size="lg" color="green" icon={HiOutlineCheckCircle}/>
					:<Icon size="lg" color="red" icon={HiOutlineMinusCircle}/>
				}
				{isAcademicComplete
					?<Icon size="lg" color="green" icon={HiOutlineCheckCircle}/>
					:<Icon size="lg" color="red" icon={HiOutlineMinusCircle}/>
				}
				{isInfoComplete
					?<Icon size="lg" color="green" icon={HiOutlineCheckCircle}/>
					:<Icon size="lg" color="red" icon={HiOutlineMinusCircle}/>
				}
			</div>

        </div>
    )
};

