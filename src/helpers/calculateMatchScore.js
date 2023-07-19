function calculateMatchScore(profile1, profile2) {
  // Se define el "peso" que tiene cada campo del perfil
  // 5 = Alto, 3 = Medio, 1 = Bajo
  const weights = {
    "profile.support": 5,
    "academic.area": 5,
    "info.career": 5,
    "info.interests": 5,
    "info.goals": 5,
    "profile.city": 3,
    "profile.country": 3,
    "academic.level": 3,
    "info.skills": 3,
    "info.languages": 3,
    "info.availability": 3,
    "academic.institution": 1,
    "academic.graduation": 1,
  };

  // Diccionario para matchear los tipos académicos
  const academicTypes = {
    Secundaria: "Sin Experiencia",
    "Universitario Junior": "Junior",
    "Universitario Intermedio": "Middle",
    "Universitario Avanzado": "Senior",
  };

  // Desestructuración de los tipos académicos de los perfiles
  const {
    academic: { type: type1 },
  } = profile1;
  const {
    academic: { type: type2 },
  } = profile2;

  // El "puntaje" de matcheo
  let score = 0;

  // Como cada perfil es un objeto con objetos,
  // se hace una búsqueda "deep" de las propiedades
  for (const key in weights) {
    const [outerKey, innerKey] = key.split(".");

    // info y academic tienen propiedades que son arrays
    if (
      ["info", "academic"].includes(outerKey) &&
      [profile1, profile2].every((profile) =>
        Array.isArray(profile[outerKey]?.[innerKey])
      )
    ) {
      // Se convierte cada array en un set
      // por eficiencia y operaciones de conjunto
      const set1 = new Set(profile1[outerKey][innerKey]);
      const set2 = new Set(profile2[outerKey][innerKey]);

      // Operaciones de conjunto para evaluar la diversidad/complementariedad
      const commonData = new Set(
        [...set1].filter((data) => set2.has(data))
      );
      const exclusiveData1 = new Set(
        [...set1].filter((data) => !set2.has(data))
      );
      const exclusiveData2 = new Set(
        [...set2].filter((data) => !set1.has(data))
      );
      const totalExclusiveData = exclusiveData1.size + exclusiveData2.size;

      // Se suman puntos según los datos en común
      score += weights[key] * commonData.size;

      // Se suman puntos extra en base a mayor afinidad:
      // Mientras la resta entre commonData y el total de exclusiveData 
      // esté más alejada de cero, siendo positiva, significa que 
      // los perfiles tienen menos datos que los diferencian.
      if (commonData.size > 0 && (totalExclusiveData) < commonData.size) {
        score += weights[key] * (commonData.size - (totalExclusiveData));
      }

      // Las demás propiedades van a ser un solo value (una vez elegido)
    } else if (
      profile1[outerKey] &&
      profile2[outerKey] &&
      profile1[outerKey][innerKey] === profile2[outerKey][innerKey]
    ) {
      // Si hay coincidencia se suma al score
      score += weights[key];
    }
  }

  // Se usa el diccionario para matchear el tipo académico
  if (academicTypes[type2] === type1 || academicTypes[type1] === type2) {
    score += 5;
  }

  return score;
}