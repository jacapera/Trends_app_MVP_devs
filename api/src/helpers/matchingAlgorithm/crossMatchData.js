const { countCommonElements } = require("./countCommonElements.js");
const { crossMatchDataOptions } = require("./crossMatchDataOptions.js");

// Se toma al usuario objetivo y a su potencial match
const crossMatchData = (user, targetUser) => {
  // Se extraen los campos a usar:

  // Usuario principal
  const {
    info_problematic: targetUserProblematic,
    info_goals: targetUserGoals,
    info_career: targetUserCareer,
    info_skills: targetUserSkills,
    info_interests: targetUserInterests,
    academic_area: targetUserAcademicArea,
  } = targetUser;

  // Potencial match
  const {
    info_problematic: userProblematic,
    info_goals: userGoals,
    info_career: userCareer,
    info_skills: userSkills,
    info_interests: userInterests,
    academic_area: userAcademicArea,
  } = user;

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
    Number(user.profile_support)
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
    Number(targetUser.profile_support)
  );

  // Se retorna el máximo entre ambos
  return Math.max(scoreUser, scoreTargetUser);
};

module.exports = { crossMatchData };
