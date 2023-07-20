// Se toman el objetivo, la carrera y el área
// y si ofrece/necesita apoyo
const matchGoalsScore = (
  goals,
  careerCount,
  academicAreaCount,
  goalsCount,
  skillsCount,
  interestsCount,
  supportCondition
) => {
  let score = 0;

  const goalsData = {
    "Conocer más sobre el mercado laboral de mi profesión": {
      career: 2 * careerCount,
      area: 2 * academicAreaCount,
      support: 5 * supportCondition,
    },
    "Conocer nuevos colegas y oportunidades": {
      career: 2 * careerCount,
      area: 2 * academicAreaCount,
      goals: 2 * goalsCount,
      skills: 2 * skillsCount,
      interests: 2 * interestsCount,
    },
  };

  // Se recorre goalsData:
  // se busca el objetivo y se suman puntos
  // de acuerdo a sus opciones
  for (const goal of goals) {
    if (goal in goalsData) {
      const options = goalsData[goal];
      for (const option in options) {
        score += options[option];
      }
    }
  }

  return score;
};

// helper para contar elementos en común
const countCommonElements = (set1, set2) => {
  let count = 0;
  set1.forEach((item) => {
    if (set2.has(item)) {
      count++;
    }
  });
  return count;
};

// La función principal:
// Se toma al usuario objetivo y a su potencial match
export const matchGoals = (user, targetUser) => {
  // Extrae sus objetivos, información de carrera, área, etc
  const userGoals = new Set(user.info.goals);
  const userCareer = new Set(user.info.career);
  const userSkills = new Set(user.info.skills);
  const userInterests = new Set(user.info.interests);
  const userAcademicArea = new Set(user.academic.area);
  const targetUserGoals = new Set(targetUser.info.goals);
  const targetUserCareer = new Set(targetUser.info.career);
  const targetUserSkills = new Set(user.info.skills);
  const targetUserInterests = new Set(user.info.interests);
  const targetUserAcademicArea = new Set(targetUser.academic.area);

  // Se cuentan los elementos en común
  const commonCareerCount = countCommonElements(userCareer, targetUserCareer);
  const commonAcademicAreaCount = countCommonElements(
    userAcademicArea,
    targetUserAcademicArea
  );
  const commonGoalsCount = countCommonElements(userGoals, targetUserGoals);
  const commonSkillsCount = countCommonElements(userSkills, targetUserSkills);
  const commonInterestsCount = countCommonElements(
    userInterests,
    targetUserInterests
  );

  // Se definen los puntajes correspondientes
  const scoreUser = matchGoalsScore(
    userGoals,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(targetUser.profile.support)
  );

  const scoreTargetUser = matchGoalsScore(
    targetUserGoals,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(user.profile.support)
  );

  // Se retorna el máximo entre los dos
  return Math.max(scoreUser, scoreTargetUser);
};

/**
 * Con este código se contemplan los casos:
 * (est - prof, prof - prof)
 * goals: Conocer más sobre el mercado laboral de mi profesión / info.career / academic.area - info.career / academic.area / support: true
 *
 * (prof - prof)
 * goals: Conocer nuevos colegas y oportunidades - goals: Conocer nuevos colegas y oportunidades / [sumar más si matchean en -> info.career / academic.area / info.skills / info.goals / info.interests]
 */
