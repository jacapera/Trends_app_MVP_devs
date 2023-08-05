import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import style from './dataJobCompany.module.css';

const dataJobCompany = ({formJob,handleChangeForm,handleChangeSelect})=>{

    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchdata = async () => {
        try {
          const response = await fetch("../../../../src/data/data.json");
          const jsonData = await response.json();
          //console.log("que trae jsonData: ", jsonData);
          setData(jsonData);
        } catch (error) {
          console.log("error al leer data.json: ", error.message);
        }
      };
      fetchdata();
    }, []);

    return(
        <div>
            <div className={style.container}>
                <hr></hr><br/>
                <h1>Datos de la Oferta Laboral</h1><br/>
                    <h3>Nombre del puesto: </h3>
                    <TextInput
                        name="jobName"
                        type="text"
                        value={formJob.jobName}
                        onChange={handleChangeForm}
                        placeholder="ingrese nombre del puesto"
                    ></TextInput><br/>
                    <div className={style.dateContainer}>
                        <div>
                            <h3>Fecha de Creacion: </h3>
                            <TextInput
                                name="creationDate"
                                type="date"
                                value={formJob.creationDate}
                                onChange={handleChangeForm}
                            ></TextInput><br/>                  
                        </div>
                        <div>
                            <h3>¿Oferta Activa?</h3>
                            <TextInput
                                name="active"
                                type="checkbox"
                                checked={formJob.active}
                                //value={formJob.active}
                                onChange={handleChangeForm}
                            /><br/>
                        </div>
                        <div>
                            <h3>Fecha de Cierre: </h3>
                            <TextInput
                                name="closingDate"
                                type="date"
                                value={formJob.closingDate}
                                onChange={handleChangeForm}
                            ></TextInput><br/>                            
                        </div>
                    </div>
                <hr></hr><br/>
                <h1>Requisitos Academicos</h1>

                    <h3>Nivel educativo requerido: </h3>
                    <Select
                        name="level_required"
                        value={formJob.level_required}
                        onChange={(value) => handleChangeSelect("level_required", value)}
                        placeholder="--seleccione opcion--"
                    >
                        {data?.levelStudent.map((level, index) => (
                        <SelectItem key={index} value={level.value}>
                            {level.value}
                        </SelectItem>
                        ))}
                    </Select>
                    {/* {error.level_required && (
                        <label style={{ color: "red" }}>{error.level_required}</label>
                    )} */}
                    <br />

                    <h3>¿Que areas la empresa busca incorporar personal? </h3>
                    <TextInput
                        name="study_area"
                        type="text"
                        value={formJob.study_area}
                        onChange={handleChangeForm}
                        placeholder="ingrese areas separadas por comas"
                    ></TextInput>
                    {/* {error.study_area && (
                        <label style={{ color: "red" }}>{error.study_area}</label>
                    )} */}
                    <br />

                    <h3>Experiencia requerida: </h3>
                    <TextInput
                        name="experience_required"
                        type="number"
                        value={formJob.experience_required}
                        onChange={handleChangeForm}
                    ></TextInput>
                    {/* {error.experience_required && (
                        <label style={{ color: "red" }}>{error.experience_required}</label>
                    )} */}
                    <br />

                    <h3>Area/Industria: </h3>
                    <TextInput
                        name="industry"
                        type="text"
                        value={formJob.industry}
                        onChange={handleChangeForm}
                    ></TextInput>                    

                    <br />    

            </div>
        </div>
    )
};

export default dataJobCompany;