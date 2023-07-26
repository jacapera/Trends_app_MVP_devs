import { convertObjToSets } from "./convertObjToSets.js";
import { countCommonElements } from "./countCommonElements.js";

// Se toman el objetivo, la carrera, el área, etc...
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

  // Por escalabilidad se define un objeto goalsData
  // en donde se puedan ir añadiendo más opciones
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
  goals?.forEach((goal) => {
    if (goal in goalsData) {
      const options = goalsData[goal];
      Object.values(options).forEach((option) => {
        score += option;
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
export const matchGoals = (user, targetUser) => {
  // Se extraen sus objetivos, información de carrera, área, etc...
  // Utilizando convertObjToSets se pueden añadir nuevos campos en el futuro

  // Usuario principal
  const {
    goals: targetUserGoals,
    career: targetUserCareer,
    skills: targetUserSkills,
    interests: targetUserInterests,
  } = convertObjToSets(targetUser.info);
  const {
    area: targetUserAcademicArea,
  } = convertObjToSets(targetUser.academic);

  // Potencial match
  const {
    goals: userGoals,
    career: userCareer,
    skills: userSkills,
    interests: userInterests,
  } = convertObjToSets(user.info);
  const {
    area: userAcademicArea,
  } = convertObjToSets(user.academic);

  // Se cuentan los elementos en común
  const commonCareerCount = 
    countCommonElements(
      userCareer, 
      targetUserCareer
    );
  const commonAcademicAreaCount = 
    countCommonElements(
      userAcademicArea,
      targetUserAcademicArea
    );
  const commonGoalsCount = 
    countCommonElements(
      userGoals, 
      targetUserGoals
    );
  const commonSkillsCount = 
    countCommonElements(
      userSkills, 
      targetUserSkills
    );
  const commonInterestsCount = 
    countCommonElements(
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
