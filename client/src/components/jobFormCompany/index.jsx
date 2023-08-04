<<<<<<< HEAD
import { Select, SelectItem, Subtitle, TextInput, Title , Button} from "@tremor/react";
import { useEffect, useState } from "react";
import DataJobCompany from "./dataJobCompany/dataJobCompany";
import InfoJobCompany from "./infoJobCompany/infoJobCompany";
import style from "./index.module.css";


const JobFormCompany = ({jobEdit,companyId})=>{
    console.log("que ingresa por jobEdit <jobFormCompany>: ", jobEdit)
    console.log("que ingresa por companyId <jobFormCompany>: ", companyId)
    
const[isFormComplete, setIsFormComplete] = useState(false);


const[formJob, setFormJob] = useState({
    jobName:"",
    creationDate:"",
    closingDate:"",
    active:true, //true / false
    level_required:"",
    study_area:[],
    experience_required:"",
    industry:[],    
    benefits:[],
    skills_required:[],
    job_description:[],
    job_goal:[],
    languages_required:[],
    availability:"",
    contract_offered:"",    
});

const[pageForm, setPageForm] = useState({
    button1:"Anterior",
    button1_hide:true,
    button2:"Continuar",
    button2_hide:false,
    div_data:false,
    div_info:true,
});

const handlePageForm = (event) =>{
    console.log("presiona boton");
    if(!pageForm.div_data){
        //SI ESTAMOS EN PAGINA DATOS LABORALES
        console.log("entra a div_data");
        setPageForm({
            button1:"Anterior",
            button1_hide:false,
            button2:"Continuar",
            button2_hide:true,
            div_data:true,
            div_info:false,            
        });
    };

    if(!pageForm.div_info){
        //SI ESTAMOS EN PAGINA INFORMACION LABORAL 
        console.log("entramos a div_info");
        setPageForm({
            button1:"Anterior",
            button1_hide:true,
            button2:"Continuar",
            button2_hide:false,
            div_data:false,
            div_info:true,               
        });
    };
};

    const handleChangeSelect = (prop,value)=>{
        setFormJob({...formJob,[prop]:value})
    }

    const handleChangeForm = (event)=>{
        console.log("que trae event: ", event);
        const {name,value,checked} = event.target;
        if(name==="active"){
            console.log("->entra a active");
            if(!checked){
                // Obtiene la fecha actual
                let fechaActual = new Date();

                // Extrae los componentes de la fecha
                let año = fechaActual.getFullYear();
                let mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes porque en JavaScript los meses comienzan en 0
                let dia = String(fechaActual.getDate()).padStart(2, '0');

                // Construye la fecha en formato "yyyy/MM/dd"
                let fechaFormateada = año + '-' + mes + '-' + dia;

                setFormJob({...formJob,closingDate:fechaFormateada, [name]:checked})
            }else{
                setFormJob({...formJob,closingDate:"", [name]:checked})
            }
            return;
        }

        
        if(name==="closingDate"){
            console.log("->entra a closingDate");
            console.log("que tiene value: ", value)
            if(value!==""){
                setFormJob({...formJob,closingDate:value, active:false})
            }else{
                setFormJob({...formJob,closingDate:value, active:true})
            }
            return;
        }
        
        setFormJob({...formJob,[name]:value});
        
    };

    //Asi formatea al enviar la carga/modificacion de una oferta laboral
    const formatJob = (data) =>{
        console.log("que tiene data: ", data)
        const format = {
            companyId:companyId,
            jobName:data.jobName,
            creationDate:data.creationDate,
            closingDate:data.closingDate,
            active:data.active, //true / false
            level_required:data.level_required,
            study_area:data.study_area.split(','),//[],
            experience_required:data.experience_required,
            industry:data.industry.split(','),//[],    
            benefits:data.benefits.split(','),//[],
            skills_required:data.skills_required.split(','),//[],
            job_description:data.job_description.split(','),//[],
            job_goal:data.job_goal.split(','),//[],
            languages_required:data.languages_required.split(','),//[],
            availability:data.availability,
            contract_offered:data.contract_offered
        };
    
        return format;
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        const envioData = formatJob(formJob);
        console.log("como envia datos job: ", envioData)
        //!PIDE DE NUEVO A BACK JOBS Y RENDERIZA DE NUEVO.
        const URL="http://localhost:3001"

    };

    const validateForm = (data) =>{
        for(let propiedad in data){
            if((data[propiedad] === "" || data[propiedad].length ===0)&&propiedad!=="closingDate") return false;
        }
        return true;
    };

    useEffect(()=>{
        console.log("que tiene formJob: ", formJob);
        setIsFormComplete(validateForm(formJob));
    },[formJob]);


    //?AL MONTARSE EL COMPONENTE|
    useEffect(()=>{
        console.log(">> AL MONTAR JOB-FORM")
        console.log(">> que trae jobEdit: ", jobEdit);
        if(jobEdit){
            console.log(">> jobEdit tiene datos")
            setFormJob({
                jobName:jobEdit.jobName,
                creationDate:jobEdit.creationDate,
                closingDate:jobEdit.closingDate,
                active:jobEdit.active,
                level_required:jobEdit.levelRequired,
                study_area:jobEdit.studyArea.join(','),
                experience_required:jobEdit.experienceRequired,
                industry:jobEdit.industry.join(','),
                benefits:jobEdit.benefits.join(','),
                skills_required:jobEdit.skillsRequired.join(','),
                job_description:jobEdit.jobDescription.join(','),
                job_goal:jobEdit.jobGoal.join(','),
                languages_required:jobEdit.languagesRequired.join(','),
                availability:jobEdit.availability,
                contract_offered:jobEdit.contractOffered,
            })

        }else{
            console.log(">> jobEdit NO Ttiene datos")
        }
    

    },[])

    return(
        <div className={style.container}>
            {
                jobEdit 
                    ?<Title>Modificacion de Oferta Laboral</Title>
                    :<Title>Carga de Nueva Oferta Laboral</Title>
            }
            
            <form onSubmit={submitHandler}>
                {/* DATOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_data}>
                    <DataJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}
                    />
                </div>
            
                {/* INFORMACION Y BENEFICIOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_info}>
                    <InfoJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}                    
                    />
                </div>
                {/* BOTON GUARDAR */}
                <div>
                    <Button
                        disabled={!isFormComplete}
                        type="submit"
                        style={{ margin: 10, padding: 10 }}
                    >{jobEdit ?"Modificar" :"Cargar"} Oferta Laboral</Button>
                </div>
            </form>
            {/* BOTONES NAVEGACION */}
            <div>
                <button
                    name="Anterior"
                    hidden={pageForm.button1_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button1}</button>
                <button
                    name="Continuar"
                    hidden={pageForm.button2_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button2}</button>
            </div>
        </div>
    )
};

=======
import { Select, SelectItem, Subtitle, TextInput, Title , Button} from "@tremor/react";
import { useEffect, useState } from "react";
import DataJobCompany from "./dataJobCompany/dataJobCompany";
import InfoJobCompany from "./infoJobCompany/infoJobCompany";


const JobFormCompany = ({jobEdit})=>{
    
const[isFormComplete, setIsFormComplete] = useState(false);


const[formJob, setFormJob] = useState({
    jobName:"",
    creationDate:"",
    closingDate:"",
    active:true, //true / false
    level_required:"",
    study_area:[],
    experience_required:"",
    industry:[],    
    benefits:[],
    skills_required:[],
    job_description:[],
    job_goal:[],
    languages_required:[],
    availability:"",
    contract_offered:"",    
});

const[pageForm, setPageForm] = useState({
    button1:"Anterior",
    button1_hide:true,
    button2:"Continuar",
    button2_hide:false,
    div_data:false,
    div_info:true,
});

const handlePageForm = (event) =>{
    console.log("presiona boton");
    if(!pageForm.div_data){
        //SI ESTAMOS EN PAGINA DATOS LABORALES
        console.log("entra a div_data");
        setPageForm({
            button1:"Anterior",
            button1_hide:false,
            button2:"Continuar",
            button2_hide:true,
            div_data:true,
            div_info:false,            
        });
    };

    if(!pageForm.div_info){
        //SI ESTAMOS EN PAGINA INFORMACION LABORAL 
        console.log("entramos a div_info");
        setPageForm({
            button1:"Anterior",
            button1_hide:true,
            button2:"Continuar",
            button2_hide:false,
            div_data:false,
            div_info:true,               
        });
    };
};

    const handleChangeSelect = (prop,value)=>{
        setFormJob({...formJob,[prop]:value})
    }

    const handleChangeForm = (event)=>{
        console.log("que trae event: ", event);
        const {name,value,checked} = event.target;
        if(name==="active"){
            console.log("->entra a active");
            if(!checked){
                // Obtiene la fecha actual
                let fechaActual = new Date();

                // Extrae los componentes de la fecha
                let año = fechaActual.getFullYear();
                let mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes porque en JavaScript los meses comienzan en 0
                let dia = String(fechaActual.getDate()).padStart(2, '0');

                // Construye la fecha en formato "yyyy/MM/dd"
                let fechaFormateada = año + '-' + mes + '-' + dia;

                setFormJob({...formJob,closingDate:fechaFormateada, [name]:checked})
            }else{
                setFormJob({...formJob,closingDate:"", [name]:checked})
            }
            return;
        }

        
        if(name==="closingDate"){
            console.log("->entra a closingDate");
            console.log("que tiene value: ", value)
            if(value!==""){
                setFormJob({...formJob,closingDate:value, active:false})
            }else{
                setFormJob({...formJob,closingDate:value, active:true})
            }
            return;
        }
        
        setFormJob({...formJob,[name]:value});
        
    };

    //Asi formatea al enviar la carga/modificacion de una oferta laboral
    const formatJob = (data) =>{
        console.log("que tiene data: ", data)
        const format = {
            datajob:{
                jobName:data.jobName,
                creationDate:data.creationDate,
                closingDate:data.closingDate,
                active:data.active,
            },
            academic:{
                level_required:data.level_required,
                study_area:data.study_area.split(','),//[]
                experience_required:data.experience_required,
                industry:data.industry.split(','),//[],
            },
            info:{
                benefits:data.benefits.split(','),//[],
                skills_required:data.skills_required.split(','),//[],
                job_description:data.job_description.split(','),//[],
                job_goal:data.job_goal.split(','),//[],
                languages_required:data.languages_required.split(','),//[],
                availability:data.availability,
                contract_offered:data.contract_offered,
            }
        };
    
        return format;
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        const envioData = formatJob(formJob);
        console.log("como envia datos job: ", envioData)
        //!PIDE DE NUEVO A BACK JOBS Y RENDERIZA DE NUEVO.

    };

    const validateForm = (data) =>{
        for(let propiedad in data){
            if(data[propiedad] === "" || data[propiedad].length ===0) return false;
        }
        return true;
    };

    useEffect(()=>{
        console.log("que tiene formJob: ", formJob);
        setIsFormComplete(validateForm(formJob));
    },[formJob]);

    //?AL MONTARSE EL COMPONENTE|
    useEffect(()=>{
        console.log(">> AL MONTAR JOB-FORM")
        console.log(">> que trae jobEdit: ", jobEdit);
        if(jobEdit){
            console.log(">> jobEdit tiene datos")
            setFormJob({
                jobName:jobEdit.datajob.jobName,
                creationDate:jobEdit.datajob.creationDate,
                closingDate:jobEdit.datajob.closingDate,
                active:jobEdit.datajob.active,
                level_required:jobEdit.academic.level_required,
                study_area:jobEdit.academic.study_area.join(','),
                experience_required:jobEdit.academic.experience_required,
                industry:jobEdit.academic.industry.join(','),
                benefits:jobEdit.info.benefits.join(','),
                skills_required:jobEdit.info.skills_required.join(','),
                job_description:jobEdit.info.job_description.join(','),
                job_goal:jobEdit.info.job_goal.join(','),
                languages_required:jobEdit.info.languages_required.join(','),
                availability:jobEdit.info.availability,
                contract_offered:jobEdit.info.contract_offered,
            })

        }else{
            console.log(">> jobEdit NO Ttiene datos")
        }
    

    },[])

    return(
        <div>
            {
                jobEdit 
                    ?<Title>Modificacion de Oferta Laboral</Title>
                    :<Title>Carga de Nueva Oferta Laboral</Title>
            }
            
            <form onSubmit={submitHandler}>
                {/* DATOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_data}>
                    <DataJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}
                    />
                </div>
            
                {/* INFORMACION Y BENEFICIOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_info}>
                    <InfoJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}                    
                    />
                </div>
                {/* BOTON GUARDAR */}
                <div>
                    <Button
                        disabled={!isFormComplete}
                        type="submit"
                        style={{ margin: 10, padding: 10 }}
                    >Cargar Oferta Laboral</Button>
                </div>
            </form>
            {/* BOTONES NAVEGACION */}
            <div>
                <button
                    name="Anterior"
                    hidden={pageForm.button1_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button1}</button>
                <button
                    name="Continuar"
                    hidden={pageForm.button2_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button2}</button>
            </div>
        </div>
    )
};

>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558
export default JobFormCompany;