const matchAcademicType = (user, targetUser) => {
  // Diccionario para matchear los tipos académicos
  const academicTypes = {
    "Secundaria": "Sin Experiencia",
    "Universitario Junior": "Junior",
    "Universitario Intermedio": "Middle",
    "Universitario Avanzado": "Senior",
  };

  // Desestructuración de los tipos académicos de los perfiles
  const {
    academic: { type: type1 },
  } = user;
  const {
    academic: { type: type2 },
  } = targetUser;

  // Se usa el diccionario para matchear el tipo académico
  if (academicTypes[type2] === type1 || academicTypes[type1] === type2) {
    return 5;
  }
  // Retorna 0 si no hay match
  return 0;
};

export default matchAcademicType;
