import { Select, SelectItem, Subtitle, TextInput, Title , Button} from "@tremor/react";
import { useEffect, useState } from "react";
import DataJobCompany from "./dataJobCompany/dataJobCompany";
import InfoJobCompany from "./infoJobCompany/infoJobCompany";


const JobFormCompany = ({jobEdit})=>{
    
const[isFormComplete, setIsFormComplete] = useState(false);


const[formJob, setFormJob] = useState({
    jobName:"",
    dateCreation:"",
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
        const {name,value} = event.target;
        setFormJob({...formJob,[name]:value});
    };

    const formatJob = (data) =>{
        console.log("que tiene data: ", data)
        const format = {
            datajob:{
                jobName:data.jobName,
                dateCreation:data.dateCreation,
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
                jobName:jobEdit.jobName,
                dateCreation:jobEdit.dateCreation,
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

export default JobFormCompany;