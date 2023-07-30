const { calculateMatchScore } = require("./calculateMatchScore.js");

// Se toma un array de perfiles y un perfil base
const matcher = (users, targetUser) => {
  const matches = [];

  // Por cada perfil del arreglo se llama a calculateMatchScore
  for (const user of users) {
    const matchScore = calculateMatchScore(user, targetUser);
    matches.push({ user, matchScore });
  }

  // Se ordena las coincidencias según el match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  if (!matches.length) return { error: "No matches" };

  // Se retorna un arreglo con los perfiles que hicieron match
  return matches;
};

module.exports = { matcher };


//--- TEST ---//
// const { professionals, students } = require("./users.js");

// const matchedProfilesForStudent = matcher(professionals, students[0]);
// const matchedProfilesForProfessional = matcher(students, professionals[0]);

// console.log(matchedProfilesForProfessional);
