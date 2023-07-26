import style from "./CompanyJobs.module.css"



const CompanyJobs = ({jobs, handlePage})=>{
    console.log("que trae jobs: ", jobs)
    return(
        <div>
            <div className={style.head}>
                <h2>¡Completa la informacion de tu busqueda laboral para recibir los candidatos ideales de nuestra plataforma!</h2>
                <button 
                    onClick={()=>handlePage("jobForm")}
                    className={style.button}
                >Subir nueva busqueda</button>
            </div>
            <div className={style.body}>
                <h2>Ofertas Laborales Publicadas</h2>
                <div>
                    {
                        jobs?.map((job)=>(
                            <div key={job.id} className={style.postJob}>
                                <p>#{job.id} - {job.jobName}</p>
                                <p>Fecha de Creacion: {job.dateCreation}</p>
                                <button
                                    className={style.button}
                                >Ver Perfiles</button>
                                <button
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