export default function formatRegisterStudent(stateProfile) {
  //?Formatea objetivos en un solo arreglo
  let arrayGoals = [];
  arrayGoals = [
    ...(stateProfile.goals && stateProfile.goals),
    ...(stateProfile.other_goals && stateProfile.other_goals.split(",")),
  ];

  //?Formatea Problematica
  let arrayProblematic = [];
  arrayProblematic = [
    ...(stateProfile.problematic && stateProfile.problematic),
    ...(stateProfile.other_problematic &&
      stateProfile.other_problematic.split(",")),
  ];

  const format = {
    profile: {
      name: `${stateProfile.name} ${stateProfile.lastname}`,
      username: stateProfile.username,
      email: stateProfile.email,
      password: stateProfile.password,
      city: stateProfile.city,
      country: stateProfile.country,
      support: stateProfile.professional_support,
    },
    academic: {
      type: stateProfile.type_student,
      institution: stateProfile.institution,
      level: stateProfile.level,
      area: stateProfile.study_area.split(","), //["Ingeniería Informática"]
      graduation: stateProfile.planned_graduation, //"2023"
    },
    info: {
      career: stateProfile.career_interest.split(","), //["Desarrollo de Software"],
      skills: stateProfile.skills.split(","), //["Programación en Python", "Desarrollo web", "Bases de datos"],
      goals: arrayGoals, //["Obtener una pasantía en una empresa de tecnología", "Desarrollar habilidades de liderazgo"]
      interests: stateProfile.interests.split(","), //["Inteligencia Artificial","Desarrollo de aplicaciones móviles"]
      languages: stateProfile.languages.split(","), //["Español", "Inglés"],
      availability: stateProfile.availability, //"Full-time",
      contract: stateProfile.contract, //"Remoto",
      problematic: arrayProblematic,
    },
  };

  return format;
}
