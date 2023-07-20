// Se toma la problemática, los objetivos y si ofrece/necesita apoyo
const matchProblematicScore = (problematic, goals, supportCondition) => {
  let score = 0;

  // Por escalabilidad se define un objeto problematicData
  // en donde se pueden ir añadiendo más opciones
  const problematicData = {
    "Falta de guía profesional": {
      "Conocer nuevos colegas y oportunidades": 10,
      support: 5 * supportCondition,
    },
  };
  // Se recorre problematicData:
  // se busca la problemática y se suman puntos
  // de acuerdo a sus opciones
  for (const problem of problematic) {
    if (problem in problematicData) {
      const options = problematicData[problem];
      if (goals.size > 0) {
        for (const goal of goals) {
          if (goal in options) {
            score += options[goal];
          }
        }
      }
      score += options["support"];
    }
  }

  return score;
};

// La función principal:
// Toma al usuario objetivo y a su potencial match
export const matchProblematic = (user, targetUser) => {
  // Extrae sus problemáticas y objetivos
  const userProblematic = new Set(user.info.problematic);
  const targetUserProblematic = new Set(targetUser.info.problematic);
  const userGoals = new Set(user.info.goals);
  const targetUserGoals = new Set(targetUser.info.goals);

  // Se definen los puntajes correspondientes
  const scoreUser = matchProblematicScore(
    userProblematic,
    targetUserGoals,
    Number(targetUser.profile.support)
  );

  const scoreTargetUser = matchProblematicScore(
    targetUserProblematic,
    userGoals,
    Number(user.profile.support)
  );

  // Se retorna el máximo entre los dos
  return Math.max(scoreUser, scoreTargetUser);
};

/**
 * Con este código se contemplan los casos:
 * (est - prof)
 * problematic: "Falta de guía profesional" && goals: "Conocer nuevos colegas y oportunidades" - support: true
 *
 * (prof - prof)
 * problematic: "Falta de guía profesional" - support: true
 */
