
import calculateMatchScore from "./calculateMatchScore";

// Se toma un array de perfiles y un perfil base
export const matcher = (users, targetUser) => {
  const matches = [];

  // Por cada perfil del arreglo se llama a calculateMatchScore
  for (const user of users) {
    const matchScore = calculateMatchScore(user, targetUser);
    matches.push({ user, matchScore });
  }

  // Se ordena las coincidencias según el match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  // Se retorna un arreglo con los perfiles que hicieron match
  return matches;

};