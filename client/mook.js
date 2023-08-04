const student = {
  profile: {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    support: true, // recibir apoyo
  },
  acedemic: {
    type: "", // Secundaria - Universitario Junior - Universitario intermedio - Universitario Avanzado
    institution: "",
    level: "", // Nivel educativo
    area: [], // Área de estudio (sin grado y/o posgrado)
    graduation: new Date().toLocaleDateString("es", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }), // Por ej: 18/7/2023   // Fecha prevista de graduación
  },
  info: {
    career: [], // Intereses de carrera
    skills: [],
    goals: [],
    interests: [],
    languages: [],
    availability: "",
    contract: "", // Tipo de contratación buscada
  },
};

const professional = {
  profile: {
    name: "Enzo Bosch",
    username: "Ebosch14",
    email: "enzo@mail.com",
    password: "123456",
    city: "Presidencia roque Saenz Peña",
    State: "Chaco",
    country: "Argentina",
    support: true, // dar apoyo
  },
  acedemic: {
    type: "Middle", // Sin exp - Junior - Intermedio - Senior
    institution: "UTN FRRe",
    level: "Universitario", // Nivel educativo
    area: ["Ingenieria en Sistemas", "Tecnico de PC", "Community Manager"], // Área de su(s) carrera(s) (con grado y/o posgrado)
    graduation: "2012"
  },
  info: {
    company_name: "",
    position: "",
    career: [], // responsabilidades, logros
    skills: [],
    interests: [],
    goals: [],
    languages: [],
    availability: "",
    contract: "", // Tipo de contratación
  },
};
