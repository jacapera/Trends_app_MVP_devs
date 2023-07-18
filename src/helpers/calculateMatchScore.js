function calculateMatchScore(profile1, profile2) {
  // Se define el "peso" que tiene cada campo del perfil
  // 5 = Alto, 3 = Medio, 1 = Bajo
  // Podría ser mejor refinar aún más el puntaje de cada campo
  // Por ejemplo: Alto = de 5 a 3, etc
  const weights = {
    "profile.support": 5,
    // "academic.type": 5,  // Falta desarrollar la lógica
                            // En este caso no habrá equivalencias 1:1
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
      const commonItems = profile1[outerKey][innerKey].filter((item) =>
        profile2[outerKey][innerKey].includes(item)
      );

      // Si tiene al menos un item en común se suma al score
      // (Se podría especificar cuántos puntos sumar
      // dependiendo de la cantidad de coincidencias)
      if (commonItems.length > 0) {
        score += weights[key];
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

  return score;
}