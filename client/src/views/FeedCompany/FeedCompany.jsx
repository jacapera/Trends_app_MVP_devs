import { useEffect, useState } from "react";
import style from "./FeedCompany.module.css";
import { ProfileCompany } from "../index";
import { CompanyJobs, JobFormCompany } from "../../components/index";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat} from 'react-icons/hi';
import { Title } from "@tremor/react";
import CandidatesCompany from "../../components/CandidatesCompany/candidatesCompany";
import { matcherCandidatesJob } from "../../utils/matcherCandidatesJob";
 
const feedCompany = () =>{

    const[companyData, setCompanyData] = useState();
    const[jobs, setJobs] = useState();
    
    //!SE VA A CAMBIAR POR DISPATCH QUE TRAIGA DATOS DESDE BACK
    const company1 = {
        profile: {
            company_name: "Coca Cola",
            cuit: "27303255418",
            website: "https://cocacola.com.ar",
            bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque at corporis autem quisquam ex corrupti magni minima facere, perferendis nisi pariatur aliquam ad debitis earum voluptatibus animi ullam! Dolorum, consectetur.",
            image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            username: "juanperez",
            email: "coca.cola@example.com",
            password: "contraseña123",
            city: "Buenos Aires",
            country: "Argentina",
        },
        jobs:[
            {
            datajob:{
                id:"1",
                jobName:"Programador Senior en Python",
                creationDate:"2023-07-20",
                closingDate:"",
                active:true,
            },
            academic: {
                level_required: "Avanzado", //Nivel educacion requerida
                study_area: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
                experience_required: "3", //Experiencia requerida
                industry: ["Finanzas y Banca","TI"], //Industria/Sector
                },
            info: {
                benefits: ["Planes de seguro de salud","Flexibilidad laboral"],
                skills_required: ["Programación en Python", "Desarrollo web", "Bases de datos"],
                job_description: ["Inteligencia Artificial","Desarrollo de aplicaciones móviles"],
                job_goal: ["Obtener una pasantía en una empresa de tecnología","Desarrollar habilidades de liderazgo"],
                languages_required: ["Español", "Inglés"],
                availability: "Full-Time",
                contract_offered: "Remoto",
                },    
            },
            {
            datajob:{
                id:"2",
                jobName:"Arquitecto de Aplicaciones",
                creationDate:"2023-07-07",
                closingDate:"",
                active:true,
            },
            academic: {
                level_required: "Avanzado", //Nivel educacion requerida
                study_area: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
                experience_required: "5", //Experiencia requerida
                industry: ["Servicios TI","Consultoria de TI"], //Industria/Sector
                },
            info: {
                benefits: ["Planes de seguro de salud","Flexibilidad laboral"],
                skills_required: ["C#", ".NET", "Java", "UML"],
                job_description: ["Arquitecto de Aplicación", "Experiencia en metodologías Agiles y DevSecOps"],
                job_goal: ["liderazgo", "atencion al detalle", "calidad del software"],
                languages_required: ["Español", "Inglés"],
                availability: "Full-Time",
                contract_offered: "Presencial",
                },    
            },  
            {
            datajob:{
                id:"3",
                jobName:"RPA Developer",
                creationDate:"2023-02-07",
                closingDate:"2023-07-01",
                active:false,
            },
            academic: {
                level_required: "Avanzado", //Nivel educacion requerida
                study_area: ["Ingeniería Informática"], //Que areas la empresa esta buscando incorporar personal?
                experience_required: "5", //Experiencia requerida
                industry: ["Servicios TI","Consultoria de TI"], //Industria/Sector
                },
            info: {
                benefits: ["Planes de seguro de salud","Flexibilidad laboral"],
                skills_required: ["Mainframe knowledge", "AS400 preferred"],
                job_description: ["Arquitecto de Aplicación", "Experiencia en metodologías Agiles y DevSecOps"],
                job_goal: ["liderazgo", "atencion al detalle", "calidad del software"],
                languages_required: ["Español", "Inglés"],
                availability: "Full-Time",
                contract_offered: "Presencial",
                },    
            },             
        ]        
    };

    
    useEffect(()=>{
        setCompanyData(company1.profile);
        setJobs(company1.jobs);
    },[])

    const[page, setPage] = useState("companyJobs");
    const[jobEdit, setJobEdit] = useState();

    const handlePage = (namepage) => {
        setPage(namepage)
    };

    const handlePageEditJob = (namepage,data) =>{
        console.log("que recibe data: ", data);
        console.log("que recibe namepage: ", namepage);
        setJobEdit(data);

        handlePage(namepage);
    };

    const handlePageCandidates = (namepage,data) =>{
        //!EJECUTO ALGORITMO MATCHEO Y ENVIO RESULTADOS A COMPONENTE
        matcherCandidatesJob(data);


        handlePage(namepage);
    }
    
    return(
        <>
        <div className={style.container}>
            <div className={style.left}>
                <Title>#trends</Title>
                <button 
                    onClick={()=>handlePage("companyJobs")} 
                    className={style.button}
                ><AiFillHome  size={35} color="#9AC2EF" /></button>
                <p>Inicio</p>

                <button 
                    onClick={()=>handlePage("profileCompany")}
                    className={style.button}
                ><HiUser size={35} color="#9AC2EF"  /></button>
                <p>Mi Perfil</p>

                <button 
                    onClick={()=>handlePage("Chats")}
                    className={style.button}
                ><HiChat size={35} color="#9AC2EF" /></button>
                <p>Mis Chats</p>
            </div>
            <div className={style.right}>
                {page === "companyJobs" && <CompanyJobs jobs={jobs} handlePageEditJob={handlePageEditJob} handlePageCandidates={handlePageCandidates}/> }
                {page === "jobForm" && <JobFormCompany jobEdit={jobEdit}/>}
                {page === "Candidates" && <CandidatesCompany/>}
                {page === "profileCompany" && <ProfileCompany/>}
                {page === "Chats"}
            </div>
        </div>
        </>
    )
};

export default feedCompany;