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
                <Subtitle>Datos de la Oferta Laboral</Subtitle>
                    <label>Nombre del puesto: </label><br/>
                    <TextInput
                        name="jobName"
                        type="text"
                        value={formJob.jobName}
                        onChange={handleChangeForm}
                        placeholder="ingrese nombre del puesto"
                    ></TextInput><br/>
                    <label>Fecha de Creacion: </label><br/>
                    <TextInput
                        name="dateCreation"
                        type="date"
                        value={formJob.dateCreation}
                        onChange={handleChangeForm}
                        placeholder="ingrese nombre del puesto"
                    ></TextInput><br/>
                    {/* <DatePicker
                        name="dateCreation"
                        //value={formJob.dateCreation}
                        onValueChange={handleChangeForm}
                        locale={es}
                    /> */}

                <Subtitle>Requisitos Academicos</Subtitle>

                    <label>Nivel educativo requerido: </label><br/>
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

                    <label>¿Que areas la empresa busca incorporar personal? </label>
                    <br />
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

                    <label>Experiencia requerida: </label>
                    <br />
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

                    <label>Area/Industria: </label>
                    <br />
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