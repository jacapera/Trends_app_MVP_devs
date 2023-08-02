import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import style from './candidatesCompany.module.css';
import { useEffect, useState } from "react";
import {HiAcademicCap,HiBriefcase} from 'react-icons/hi';

 
const candidatesCompany = ({jobName,arraycandidates}) => {
    console.log("que recibe jobName <candidatesCompany>: ", jobName)
    console.log("que recibe arraycandidates <candidatesCompany>: ", arraycandidates);
    const[candidates, setCandidates] = useState();

    const calcularEdad=(fechaNacimiento)=>{
        const fechaNacObj = new Date(fechaNacimiento);
        const fechaActual = new Date();

        let edad = fechaActual.getFullYear() - fechaNacObj.getFullYear();

        //Verifica que no pase dia de cumpleaños
        const mesActual = fechaActual.getMonth();
        const diaActual = fechaActual.getDate();
        const mesNacimiento = fechaNacObj.getMonth();
        const diaNacimiento = fechaNacObj.getDate();

        if(mesActual<mesNacimiento || (mesActual===mesNacimiento && diaActual < diaNacimiento)){
            edad--;
        }

        return edad;
    }

    const [value, setValue] = useState('all');
    const [filterCandidates, setFilterCandidates] = useState();
    useEffect(()=>{
        if(value==='all'){
            setFilterCandidates(candidates);
        }
        if(value==='student'){
            const filter = candidates.filter((candidate)=>candidate.type==='student');
            setFilterCandidates(filter)
        }
        if(value==='professional'){
            const filter = candidates.filter((candidate)=>candidate.type==='professional');
            setFilterCandidates(filter)
        }
    },[value])

    useEffect(()=>{
        //al montarse
        setCandidates(arraycandidates);
        setFilterCandidates(arraycandidates);
    },[]);

    return(
        <div>
            <div className={style.head}>
                <Title>Cantidatos para oferta laboral: {jobName}</Title>
                <div className={style.selectContainer}>
                    <Select 
                        value={value} onValueChange={setValue}
                    >
                        <SelectItem value="all">todos</SelectItem>
                        <SelectItem value="student">estudiantes</SelectItem>
                        <SelectItem value="professional">profesionales</SelectItem>
                    </Select>
                </div>
            </div>
            <div className={style.cardContainer}>
                {
                    filterCandidates?.map((candidate,index)=>(
                        <div className={style.card} key={index}>
                            <div className={style.cardImage}>
                                <img src={candidate.profile_image}/>
                            </div>
                            <div className={style.cardProfile}>
                                <div className={style.nameIcon}>
                                    <Title>{candidate.name}</Title>{candidate.type==="student" ?<HiAcademicCap/> :<HiBriefcase/>}
                                </div>
                                <p className={style.subtitle}>{calcularEdad(candidate.profile_birth)} Años - {candidate.info_career.join(',')}</p>
                                <p>{candidate.profile_bio}</p>
                                <div className={style.cardButtons}>
                                    <button
                                        name="btn-perfil"
                                        className={style.buttons}
                                    >Perfil</button>
                                    <button
                                        className={style.buttons}
                                        name="btn-chat"
                                    >Chat</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default candidatesCompany;