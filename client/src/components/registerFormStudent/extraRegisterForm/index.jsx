import { useEffect, useState } from "react";
import { TextInput, Title, MultiSelect, MultiSelectItem } from "@tremor/react";
// import { Button, Italic, Select, SelectItem } from "@tremor/react";

export default function StudentRegisterExtra({
  profile,
  handleChangeSelect,
  handleChangeProfile,
}) {
  const [data, setData] = useState(null);

  console.log("que trae profile: ", profile);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("../src/data/data.json");
        const jsonData = await response.json();
        console.log("que trae jsonData: ", jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("error al leer data.json: ", error.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      {/* INFORMACION EXTRA */}
      <div>
        <Title>Informacion Extra</Title>
        <p>
          Para mejorar tu experiencia y nuestras recomendaciones, te pedimos que
          marques las casillas correspondientes.
        </p>
        <p>
          Cual o cuales son tus objetivos como estudiante en los siguientes 6
          meses
        </p>
        <label>Objetivos: </label>
        <br />
        <MultiSelect
          name="goals"
          //value={profile.goals}
          onChange={(value) => handleChangeSelect("goals", value)}
          placeholder="--seleccione opcion--"
        >
          {data?.goals.map((goal, index) => (
            <MultiSelectItem key={index} value={goal.value}>
              {goal.value}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <br />

        <TextInput
          name="other_goals"
          type="text"
          placeholder="Otros objetivos, separados por comas"
          disabled={!profile.goals.includes("Otros Objetivos")}
          value={profile.other_goals}
          onChange={handleChangeProfile}
        ></TextInput>
        <br />

        <p>
          Por ultimo, selecciona de los siguientes problemas, ¿cuales tienes
          presente como estudiante?
        </p>
        <label>Problematica: </label>
        <MultiSelect
          name="problematic"
          //value={profile.goals}
          onChange={(value) => handleChangeSelect("problematic", value)}
          placeholder="--seleccione opcion--"
        >
          {data?.problematics.map((problematic, index) => (
            <MultiSelectItem key={index} value={problematic.value}>
              {problematic.value}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <br />

        <TextInput
          name="other_problematic"
          type="text"
          placeholder="Otros problemas, separados por comas"
          //disabled={!profile.goals.includes("Otros objetivos")}
          value={profile.other_problematic}
          onChange={handleChangeProfile}
        ></TextInput>
        <br />
      </div>
    </div>
  );
}
