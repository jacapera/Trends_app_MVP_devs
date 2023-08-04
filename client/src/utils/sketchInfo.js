export const student = {
  profile: {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    support: true,
  },
  acedemic: {
    type: "", // Secundaria - Universitario Junior - Universitario intermedio - Universitario Avanzado
    institution: "",
    level: "",
    area: "",
    graduation: new Date(), // acá debería setearse una fecha default
  },
  info: {
    career: "",
    skills: "",
    goals: "",
    interests: "",
    languages: "",
    availability: "",
    contract: "",
  },
};

export const professional = {
  profile: {
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    country: "",
    support: true,
  },
  acedemic: {
    type: "", // Sin exp - Junior - Intermedio - Senior
    institution: "",
    level: "",
    degrees: "",
    graduation: new Date(),
  },
  info: {
    company_name: "",
    position: "",
    responsibilities_achievements: "",
    skills: "",
    interests: "",
    goals: "",
    languages: "",
    availability: "",
    contract: "",
  },
};

export const company = {
  profile: {
    legal_name: "",
    username: "",
    mail: "",
    site: "",
    password: "",
    location: "",
  },
  acedemic: {
    req_level: "",
    req_experience: "",
    req_area: "",
    degrees: "",
    graduation: new Date(),
  },
  info: {
    sector: "",
    position: "",
    benefits: "",
    responsabilities: "",
    languages: "",
    availability: "",
    contract: "",
    skills: "",
    goals: "",
  },
};
