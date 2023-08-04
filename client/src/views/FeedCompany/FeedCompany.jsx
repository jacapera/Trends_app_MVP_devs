import { useEffect, useState } from "react";
import style from "./FeedCompany.module.css";
import { ProfileCompany } from "../index";
import { CompanyJobs, JobFormCompany } from "../../components/index";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat} from 'react-icons/hi';
import { Title } from "@tremor/react";
import CandidatesCompany from "../../components/CandidatesCompany/candidatesCompany";
import { matcherCandidatesJob } from "../../utils/matcherCandidatesJob";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { addCompany } from "../../Redux/UsersSlice";
const {VITE_URL} = import.meta.env;


const feedCompany = () =>{

    //?DEL STORE GLOBAL
    const companyDataSG = useSelector((state)=>state.users.companies);

    //?Store Local temporal para modo claro y oscuro
    const [mode, setMode]=useState('light-mode');

    //const[companyData, setCompanyData] = useState();
    const[jobs, setJobs] = useState();
    
    //!SE VA A CAMBIAR POR DISPATCH QUE TRAIGA DATOS DESDE BACK
    const data={
        "id": "209d1a11-ad07-4f04-952b-65c076f5cf54",
        "type": "company",
        "website": "https://cocacola.com.ar/",
        "username": "coca",
        "name": "Coca Cola LOLA MORA",
        "email": "coca.cola@example.com",
        "cuit": "27303255415",
        "city": "Buenos Aires",
        "country": "Argentina",
        "image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        "bio": "The Coca-Cola Company is a multinational beverage corporation that manufactures and markets a wide range of non-alcoholic beverages, including Coca-Cola, Diet Coke, Sprite, Fanta, and more. Our mission is to refresh the world, inspire moments of happiness, and create value for our stakeholders.",
        "createdAt": "2023-08-03T18:07:49.969Z",
        "updatedAt": "2023-08-03T18:09:17.887Z",
        "jobs": [
          {
            "id": "9eecdae0-6ec7-4505-a77c-f74c33d6a916",
            "jobName": "Senior Software Engineer",
            "creationDate": "2023-10-01",
            "closingDate": "2023-10-31",
            "active": true,
            "levelRequired": "Avanzado",
            "studyArea": [
              "Computer Science"
            ],
            "experienceRequired": "5",
            "industry": [
              "Bebidas",
              "Tecnología"
            ],
            "benefits": [
              "Planes de seguro de salud",
              "Horarios de trabajo flexibles",
              "Opciones de acciones"
            ],
            "skillsRequired": [
              "JavaScript",
              "React",
              "Node.js",
              "MongoDB",
              "AWS"
            ],
            "jobDescription": [
              "Diseñar y desarrollar soluciones de software escalables",
              "Colaborar con equipos multidisciplinarios",
              "Optimizar el rendimiento de las aplicaciones"
            ],
            "jobGoal": [
              "Contribuir al desarrollo de tecnologías innovadoras para bebidas"
            ],
            "languagesRequired": [
              "Inglés",
              "Español"
            ],
            "availability": "Full-time",
            "contractOffered": "Híbrido"
          },
          {
            "id": "5ceedfdc-a015-4e02-8342-54cd15487757",
            "jobName": "Abogado Corporativo",
            "creationDate": "2023-11-01",
            "closingDate": "2023-11-30",
            "active": true,
            "levelRequired": "Avanzado",
            "studyArea": [
              "Abogacía"
            ],
            "experienceRequired": "7",
            "industry": [
              "Bebidas",
              "Legal"
            ],
            "benefits": [
              "Planes de seguro de salud",
              "Horarios de trabajo flexibles",
              "Subsidio para desarrollo profesional"
            ],
            "skillsRequired": [
              "Derecho Corporativo",
              "Negociación de contratos",
              "Asesoría legal"
            ],
            "jobDescription": [
              "Brindar asesoramiento legal a la empresa en diversos temas",
              "Redactar y revisar contratos y acuerdos",
              "Garantizar el cumplimiento de leyes y regulaciones pertinentes"
            ],
            "jobGoal": [
              "Proteger los intereses legales de The Coca-Cola Company"
            ],
            "languagesRequired": [
              "Inglés",
              "Español"
            ],
            "availability": "Full-time",
            "contractOffered": "Híbrido"
          },
          {
            "id": "01eaaef9-d783-47e8-9cac-ef3655956684",
            "jobName": "Gerente de Marketing",
            "creationDate": "2023-12-01",
            "closingDate": "2023-12-31",
            "active": true,
            "levelRequired": "Avanzado",
            "studyArea": [
              "Administración de Empresas"
            ],
            "experienceRequired": "8",
            "industry": [
              "Bebidas",
              "Marketing"
            ],
            "benefits": [
              "Planes de seguro de salud",
              "Horarios de trabajo flexibles",
              "Membresía de gimnasio"
            ],
            "skillsRequired": [
              "Estrategia de Marketing",
              "Gestión de Marca",
              "Marketing Digital"
            ],
            "jobDescription": [
              "Desarrollar e implementar estrategias de marketing",
              "Gestionar la posición de la marca y las campañas",
              "Analizar tendencias de mercado e insights de consumidores"
            ],
            "jobGoal": [
              "Impulsar el crecimiento y éxito de los productos de bebidas de Coca-Cola"
            ],
            "languagesRequired": [
              "Inglés",
              "Español"
            ],
            "availability": "Full-time",
            "contractOffered": "Híbrido"
          }
        ]
      };

    const dispatch = useDispatch();


    //?AL MONTAR COMPONENTE
    useEffect(()=>{
        
        //body.classList.add(mode);
        //setCompanyData(company1.profile);
        //setJobs(company1.jobs);
        //?REALIZO EL GET PARA TRAER COMPAÑIA CARGADA EN BD
        //!ESTE GET SE DEBE CAMBIAR HACIA EL LOGIN
        //!SE CREA ACA A MODO DE PRUEBA DE COMPONENTE INDIVIDUAL
        const fetchCompany = async () =>{
            const URL = `${VITE_URL}/api/v1/search/user`;
            const ID = '209d1a11-ad07-4f04-952b-65c076f5cf54';

            try{
                //const {data} = await axios.get(`${URL}/${ID}`);
                //dispatch()
                console.log("que trae data <FeedCompany>: ", data)
                dispatch(addCompany(data));
                setJobs(data.jobs);
            }catch(error){
                console.log("error al cargar datos a SG <FeedCompany>: ",error.message);
            }

        };
        fetchCompany();

        console.log("que trae companyDataSG: ",companyDataSG)
        console.log("que tiene jobs de data: ", companyDataSG.jobs)
        console.log(">>> qeu tiene Store Local Jobs: ", jobs);

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

    const[arraycandidates, setArrayCandidates] = useState();
    const[jobName,setJobName] = useState();

    const handlePageCandidates = async(namepage,data) =>{
        console.log("que recibe data <handlePageCandidates>: ", data)
        
        //!EJECUTO ALGORITMO MATCHEO Y ENVIO RESULTADOS A COMPONENTE
        setArrayCandidates(await matcherCandidatesJob(data));
        const nameJob='#'+data.jobName;
        setJobName(nameJob);

        console.log("que tiene arraycandidates <feedCompany>: ",arraycandidates)


        handlePage(namepage);
    }
    
    // Función para cambiar el modo entre claro y oscuro
    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle("dark-mode");
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

                {/* Modo Oscuro */}
                <div className="dark-mode-button">
                    <button onClick={toggleDarkMode}>
                    <i className="fas fa-moon"></i> 
                    </button>
                </div>
            </div>
            <div className={style.right}>
                {/* PAGINA CON BUSQUEDAS LABORALES DE COMPAÑIA */}
                {page === "companyJobs" && <CompanyJobs jobs={jobs} handlePageEditJob={handlePageEditJob} handlePageCandidates={handlePageCandidates}/> }
                {/* PAGINA QUE CREA O MODIFICA UNA OFERTA LABORAL */}
                {page === "jobForm" && <JobFormCompany jobEdit={jobEdit} companyId={companyDataSG.id}/>}
                {/* PAGINA DE CANDIDATOS QUE APLICAN A UN PUESTO LABORAL */}
                {page === "Candidates" && <CandidatesCompany jobName={jobName} arraycandidates={arraycandidates}/>}
                {/* PAGINA DEL PERFIL DE EMPRESA */}
                {page === "profileCompany" && <ProfileCompany/>}
                {page === "Chats"}
            </div>
        </div>
        </>
    )
};

export default feedCompany;