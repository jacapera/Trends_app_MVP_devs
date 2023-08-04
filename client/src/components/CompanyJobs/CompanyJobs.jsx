<<<<<<< HEAD
import { Title } from "@tremor/react";
import style from "./CompanyJobs.module.css"

 
const CompanyJobs = ({jobs, handlePageEditJob,handlePageCandidates})=>{
    console.log("que trae jobs <CompanyJobs>: ", jobs)

    return(
        <div>
            <div className={style.head}>
                <Title>¡Completa la informacion de tu busqueda laboral para recibir los candidatos ideales de nuestra plataforma!</Title>
                <button 
                    onClick={()=>handlePageEditJob("jobForm","")}
                    className={style.button}
                >Subir nueva busqueda</button>
            </div>
            <div className={style.body}>
                <Title>Ofertas Laborales Publicadas</Title>
                <div>
                    {
                        jobs?.map((job)=>(
                            <div key={job.id} className={style.postJob}>
                                {console.log("que tiene job <map>: ", job)}
                                <p>#{job.jobName}</p>
                                <p>Fecha de Creacion: {job.creationDate}</p>
                                <p>Oferta: {job.active ?"Activa" :"Cerrada"} / Fecha de cierre: {job.closingDate}</p>
                                {/* BOTON PARA VER PERFILES DE CANDIDATOS */}
                                <button
                                    onClick={()=>handlePageCandidates("Candidates",job)}
                                    className={style.button}
                                >Ver Perfiles</button>
                                {/* BOTON PARA EDITAR OFERTA LABORAL */}
                                <button
                                    onClick={()=>handlePageEditJob("jobForm",job)}
                                    className={style.button}
                                >Editar Busqueda</button>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
};

=======
import { Title } from "@tremor/react";
import style from "./CompanyJobs.module.css"


const CompanyJobs = ({jobs, handlePageEditJob,handlePageCandidates})=>{
    console.log("que trae jobs: ", jobs)

    return(
        <div>
            <div className={style.head}>
                <Title>¡Completa la informacion de tu busqueda laboral para recibir los candidatos ideales de nuestra plataforma!</Title>
                <button 
                    onClick={()=>handlePageEditJob("jobForm","")}
                    className={style.button}
                >Subir nueva busqueda</button>
            </div>
            <div className={style.body}>
                <Title>Ofertas Laborales Publicadas</Title>
                <div>
                    {
                        jobs?.map((job)=>(
                            <div key={job.datajob.id} className={style.postJob}>
                                {console.log("que tiene job <map>: ", job)}
                                <p>#{job.datajob.id} - {job.datajob.jobName}</p>
                                <p>Fecha de Creacion: {job.datajob.creationDate}</p>
                                <p>Oferta: {job.datajob.active ?"Activa" :"Cerrada"} / Fecha de cierre: {job.datajob.closingDate}</p>
                                {/* BOTON PARA VER PERFILES DE CANDIDATOS */}
                                <button
                                    onClick={()=>handlePageCandidates("Candidates",job)}
                                    className={style.button}
                                >Ver Perfiles</button>
                                {/* BOTON PARA EDITAR OFERTA LABORAL */}
                                <button
                                    onClick={()=>handlePageEditJob("jobForm",job)}
                                    className={style.button}
                                >Editar Busqueda</button>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
};

>>>>>>> 728f5c71647795b98123287a044f5c0ec788a558
export default CompanyJobs;