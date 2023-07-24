import { convertObjToSets } from "./convertObjToSets.js";

// Se toma la problemática, los objetivos 
// y si ofrece/necesita apoyo
const matchProblematicScore = (
  problematic, 
  goals, 
  supportCondition
) => {
  let score = 0;

  // Por escalabilidad se define un objeto problematicData
  // en donde se puedan ir añadiendo más opciones
  const problematicData = {
    "Falta de guía profesional": {
      "Conocer nuevos colegas y oportunidades": 10,
      support: 5 * supportCondition,
    },
  };

  // Se recorre problematicData:
  // se busca la problemática y se suman puntos
  // de acuerdo a sus opciones
  problematic?.forEach((problem) => {
    if (problem in problematicData) {
      const options = problematicData[problem];
      goals?.forEach((goal) => {
        if (goal in options) {
          score += options[goal];
        }
      });

      if ("support" in options) {
        score += options["support"];
      }
    }
  });

  return score;
};

// ----- La función principal ----- //

// Se toma al usuario objetivo y a su potencial match
export const matchProblematic = (user, targetUser) => {
  // Se extraen sus problemáticas y objetivos
  // Utilizando convertObjToSets se pueden añadir nuevos campos en el futuro

  // Usuario principal
  const {
    problematic: targetUserProblematic,
    goals: targetUserGoals,
  } = convertObjToSets(targetUser.info);

  // Potencial match
  const {
    problematic: userProblematic,
    goals: userGoals,
  } = convertObjToSets(user.info);

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
