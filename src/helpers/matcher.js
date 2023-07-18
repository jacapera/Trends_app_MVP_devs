// Se toma un array de perfiles y un perfil base
const matcher = (profiles, targetProfile) => {
  const matches = [];

  // Por cada perfil del arreglo se llama a calculateMatchScore
  for (const profile of profiles) {
    const matchScore = calculateMatchScore(profile, targetProfile);
    matches.push({ profile, matchScore });
  }

  // Se ordena las coincidencias según el match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  // Se retorna un arreglo con los perfiles que hicieron match
  return matches;
};