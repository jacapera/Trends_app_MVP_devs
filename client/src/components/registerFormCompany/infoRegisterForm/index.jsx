import { useEffect, useState } from "react";
import { Select, SelectItem, TextInput, Title } from "@tremor/react";
// import { Button, Italic } from "@tremor/react";

export default function CompanyRegisterInfo({
  formCompany,
  error,
  handleChangeSelect,
  handleChangeForm,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("../src/data/data.json");
        const jsonData = await response.json();
        //console.log("que trae jsonData: ", jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("error al leer data.json: ", error.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <Title>Intereses</Title>
      <label>Beneficios otorgados: </label>
      <br />
      <TextInput
        name="benefits"
        type="text"
        value={formCompany.benefits}
        onChange={handleChangeForm}
        placeholder="ingrese beneficios separados por comas"
      ></TextInput>

      {error.benefits && (
        <label style={{ color: "red" }}>{error.benefits}</label>
      )}
      <br />

      <label>Habilidades requeridas: </label>
      <br />
      <TextInput
        name="skills_required"
        type="text"
        value={formCompany.skills_required}
        onChange={handleChangeForm}
        placeholder="ingrese habilidades separadas por comas"
      ></TextInput>
      {error.skills_required && (
        <label style={{ color: "red" }}>{error.skills_required}</label>
      )}
      <br />

      <label>Descripcion y Responsabilidades del puesto: </label>
      <br />
      <TextInput
        name="job_description"
        type="text"
        value={formCompany.job_description}
        onChange={handleChangeForm}
        placeholder="ingrese descripcion separados por comas"
      ></TextInput>
      {error.job_description && (
        <label style={{ color: "red" }}>{error.job_description}</label>
      )}
      <br />

      <label>Objetivos y metas del trabajo propuesto: </label>
      <br />
      <TextInput
        name="job_goal"
        type="text"
        value={formCompany.job_goal}
        onChange={handleChangeForm}
        placeholder="ingrese objetivos separados por comas"
      ></TextInput>
      {error.job_goal && (
        <label style={{ color: "red" }}>{error.job_goal}</label>
      )}
      <br />

      <label>Idiomas Requeridos: </label>
      <br />
      <TextInput
        name="languages_required"
        type="text"
        value={formCompany.languages_required}
        onChange={handleChangeForm}
        placeholder="ingrese idiomas separados por comas"
      ></TextInput>
      {error.languages_required && (
        <label style={{ color: "red" }}>{error.languages_required}</label>
      )}
      <br />

      <label>Disponibilidad: </label>
      <br />
      {/* <TextInput
						name="availability"
						type="text"
						value={formCompany.availability}
						onChange={handleChangeForm}
					></TextInput> */}
      <Select
        name="availability"
        value={formCompany.availability}
        onValueChange={(value) => handleChangeSelect("availability", value)}
        placeholder="--seleccione una opcion---"
      >
        {data?.availabilitys.map((availability, index) => (
          <SelectItem key={index} value={availability.value}>
            {availability.value}
          </SelectItem>
        ))}
      </Select>
      {error.availability && (
        <label style={{ color: "red" }}>{error.availability}</label>
      )}
      <br />

      <label>Tipo de Contratacion Ofrecida: </label>
      <br />
      <Select
        name="contract_offered"
        value={formCompany.contract_offered}
        onValueChange={(value) => handleChangeSelect("contract_offered", value)}
        placeholder="--seleccione opcion---"
      >
        {data?.contracts.map((contract, index) => (
          <SelectItem key={index} value={contract.value}>
            {contract.value}
          </SelectItem>
        ))}
      </Select>
      {error.contract_offered && (
        <label style={{ color: "red" }}>{error.contract_offered}</label>
      )}
      <br />
    </div>
  );
}
