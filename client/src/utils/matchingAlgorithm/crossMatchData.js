import countCommonElements from "./countCommonElements.js";
import crossMatchDataOptions from "./crossMatchDataOptions.js";

// Se toma al usuario objetivo y a su potencial match
const crossMatchData = (user, targetUser) => {
  // Se extraen los campos a usar:

  // Usuario principal
  const {
    problematic: targetUserProblematic,
    goals: targetUserGoals,
    career: targetUserCareer,
    skills: targetUserSkills,
    interests: targetUserInterests,
  } = targetUser.info;
  const {
    area: targetUserAcademicArea,
  } = targetUser.academic;

  // Potencial match
  const {
    problematic: userProblematic,
    goals: userGoals,
    career: userCareer,
    skills: userSkills,
    interests: userInterests,
  } = user.info;
  const {
    area: userAcademicArea,
  } = user.academic;

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

  // Se verifican y establecen valores por defecto a los campos
  // a los que se les va a hacer el matcheo cruzado
  const targetUserData = [...(targetUserGoals || []), ...(targetUserProblematic || [])];
  const userData = [...(userGoals || []), ...(userProblematic || [])];

  // Se definen los puntajes correspondientes:

  // Usuario principal
  const scoreTargetUser = crossMatchDataOptions(
    targetUserData,
    userData,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(user.profile.support)
  );

  // Potencial match
  const scoreUser = crossMatchDataOptions(
    userData,
    targetUserData,
    commonCareerCount,
    commonAcademicAreaCount,
    commonGoalsCount,
    commonSkillsCount,
    commonInterestsCount,
    Number(targetUser.profile.support)
  );

  // Se retorna el máximo entre ambos
  return Math.max(scoreUser, scoreTargetUser);
};

export default crossMatchData;
