import { Title } from "@tremor/react";
import style from "./CompanyJobs.module.css"


const CompanyJobs = ({jobs, handlePageEditJob})=>{
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
                            <div key={job.id} className={style.postJob}>
                                {console.log("que tiene job: ", job)}
                                <p>#{job.id} - {job.jobName}</p>
                                <p>Fecha de Creacion: {job.dateCreation}</p>
                                <button
                                    className={style.button}
                                >Ver Perfiles</button>
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

export default CompanyJobs;