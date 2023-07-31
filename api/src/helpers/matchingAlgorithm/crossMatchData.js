const { searchUserById } = require("../../handlers/search.handlers.js");
const { countCommonElements } = require("./countCommonElements.js");
const { crossMatchDataOptions } = require("./crossMatchDataOptions.js");

// Se toma al usuario objetivo y a su potencial match
const crossMatchData = (user, targetUser) => {
  // Se verifica si alguno de los usuarios es de tipo empresa
  let company =
    user.type === "company"
      ? user
      : targetUser.type === "company"
      ? targetUser
      : null;
  
  // Se verifica que el otro sea un usuario regular
  let regularUser = ["student", "professinal"].includes(user.type)
    ? user
    : ["student", "professinal"].includes(targetUser.type)
    ? targetUser
    : null;

  // Se extraen los campos a usar:

  if (company && regularUser) {
    //--- Estudiante o Profesional ---//
    const {
      academic_area,
      info_skills,
      info_languages,
      info_availability,
      academic_level,
      info_contract,
    } = regularUser;

    //--- Empresa ---//

    // Se verifica que la empresa tenga
    // puestos de trabajo
    if (!company.jobs.length) return 0;

    const jobs = company.jobs;
    let commonElements = 0;

    for (const job of jobs) {
      const {
        studyArea,
        skillsRequired,
        languagesRequired,
        availability,
        levelRequired,
        contractOffered,
      } = job;

      // Se cuentan los elementos en común
      commonElements += countCommonElements(
        academic_area,
        studyArea
      );
      commonElements += countCommonElements(
        info_skills,
        skillsRequired
      );
      commonElements += countCommonElements(
        info_languages,
        languagesRequired
      );
      commonElements += countCommonElements(
        info_availability,
        availability
      );
      commonElements += countCommonElements(
        academic_level,
        levelRequired
      );
      commonElements += countCommonElements(
        info_contract,
        contractOffered
      );
    }
    return commonElements;
  }

  //--- Usuario principal ---//
  const {
    info_problematic: targetUserProblematic,
    info_goals: targetUserGoals,
    info_career: targetUserCareer,
    info_skills: targetUserSkills,
    info_interests: targetUserInterests,
    academic_area: targetUserAcademicArea,
  } = targetUser;

  //--- Potencial match ---//
  const {
    info_problematic: userProblematic,
    info_goals: userGoals,
    info_career: userCareer,
    info_skills: userSkills,
    info_interests: userInterests,
    academic_area: userAcademicArea,
  } = user;

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

  // Se verifican y establecen valores por defecto a los campos
  // a los que se les va a hacer el matcheo cruzado
  const targetUserData = [
    ...(targetUserGoals || []),
    ...(targetUserProblematic || []),
  ];
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
