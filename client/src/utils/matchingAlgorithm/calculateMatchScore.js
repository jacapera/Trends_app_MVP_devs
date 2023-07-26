
// import { matchAcademicType } from "./matchAcademicType.js";
// import { matchGoals } from "./matchGoals.js";
// import { matchProblematic } from "./matchProblematic.js";

/*
export const calculateMatchScore = (user, targetUser) => {
  // El "puntaje" de matcheo
  let score = 0;

  // Se definen los handlers
  // o el "peso" para cada campo del perfil
  // 5 = Alto, 3 = Medio, 1 = Bajo
  const fieldHandlers = {
    "profile.support": 5,
    "academic.area": 5,
    "academic.type": () => matchAcademicType(user, targetUser),
    "info.career": 5,
    "info.interests": 5,
    "info.goals": () => matchGoals(user, targetUser),
    "profile.city": 3,
    "profile.country": 3,
    "academic.level": 3,
    "info.skills": 3,
    "info.languages": 3,
    "info.availability": 3,
    "info.problematic": () => matchProblematic(user, targetUser),
    "academic.institution": 1,
    "academic.graduation": 1,
  };
  */

  /*
  
  // Como cada perfil es un objeto con objetos,
  // se hace una búsqueda "deep" de las propiedades
  for (const key in fieldHandlers) {
    const [outerKey, innerKey] = key.split(".");

    // Si el valor es una función, se la llama
    // y se suma su valor de retorno al score
    if (typeof fieldHandlers[key] === "function") {
      score += fieldHandlers[key]();
    } else {
      // info y academic tienen propiedades que son arrays
      if (
        ["info", "academic"].includes(outerKey) &&
        [user, targetUser].every((user) =>
          Array.isArray(user[outerKey]?.[innerKey])
        )
      ) {
        // Se convierte cada array en un set
        // por eficiencia y operaciones de conjunto
        const set1 = new Set(user[outerKey][innerKey]);
        const set2 = new Set(targetUser[outerKey][innerKey]);

        // Operaciones de conjunto para evaluar la diversidad/complementariedad
        const commonData = new Set([...set1].filter((data) => set2.has(data)));
        const exclusiveData1 = new Set(
          [...set1].filter((data) => !set2.has(data))
        );
        const exclusiveData2 = new Set(
          [...set2].filter((data) => !set1.has(data))
        );
        const totalExclusiveData = exclusiveData1.size + exclusiveData2.size;

        // Se suman puntos según los datos en común
        score += fieldHandlers[key] * commonData.size;

        // Se suman puntos extra en base a mayor afinidad:
        // Mientras la resta entre commonData y el total de exclusiveData
        // esté más alejada de cero, siendo positiva, significa que
        // los perfiles tienen menos datos que los diferencian.
        if (commonData.size > 0 && totalExclusiveData < commonData.size) {
          score += fieldHandlers[key] * (commonData.size - totalExclusiveData);
        }

        // Las demás propiedades van a ser un solo value (una vez elegido)
      } else if (
        user[outerKey] &&
        targetUser[outerKey] &&
        user[outerKey][innerKey] === targetUser[outerKey][innerKey]
      ) {
        // Si hay coincidencia se suma al score
        score += fieldHandlers[key];
      }
    }
  }

  return score;
};

*/

import matchAcademicType from "./matchAcademicType.js";
import crossMatchData from "./crossMatchData.js";

const calculateMatchScore = (user, targetUser) => {
  // El "puntaje" de matcheo
  let score = 0;

  // Se definen los handlers
  // o el "peso" para cada campo del perfil
  // 5 = Alto, 3 = Medio, 1 = Bajo
  const fieldHandlers = {
    "profile.support": 5,
    "academic.area": 5,
    "academic.type": () => matchAcademicType(user, targetUser),
    "info.career": 5,
    "info.interests": 5,
    "profile.city": 3,
    "profile.country": 3,
    "academic.level": 3,
    "info.skills": 3,
    "info.languages": 3,
    "info.availability": 3,
    "academic.institution": 1,
    "academic.graduation": 1,
  };

  // Como cada perfil es un objeto con objetos,
  // se hace una búsqueda "deep" de las propiedades
  for (const key in fieldHandlers) {
    const [outerKey, innerKey] = key.split(".");
    // Si el valor es una función, se la llama
    // y se suma su valor de retorno al score
    if (typeof fieldHandlers[key] === "function") {
      score += fieldHandlers[key]();
    } else {
      // info y academic tienen propiedades que son arrays
      if (
        ["info", "academic"].includes(outerKey) &&
        [user, targetUser].every((user) =>
          Array.isArray(user[outerKey]?.[innerKey])
        )
      ) {
        // Se convierte cada array en un set
        // por eficiencia y operaciones de conjunto
        const set1 = new Set(user[outerKey][innerKey]);
        const set2 = new Set(targetUser[outerKey][innerKey]);

        // Operaciones de conjunto para evaluar la diversidad/complementariedad
        const commonData = new Set([...set1].filter((data) => set2.has(data)));
        const exclusiveData1 = new Set(
          [...set1].filter((data) => !set2.has(data))
        );
        const exclusiveData2 = new Set(
          [...set2].filter((data) => !set1.has(data))
        );
        const totalExclusiveData = exclusiveData1.size + exclusiveData2.size;

        // Se suman puntos según los datos en común
        score += fieldHandlers[key] * commonData.size;

        // Se suman puntos extra en base a mayor afinidad:
        // Mientras la resta entre commonData y el total de exclusiveData
        // esté más alejada de cero, siendo positiva, significa que
        // los perfiles tienen menos datos que los diferencian.
        if (commonData.size > 0 && totalExclusiveData < commonData.size) {
          score += fieldHandlers[key] * (commonData.size - totalExclusiveData);
        }

        // Las demás propiedades van a ser un solo value (una vez elegido)
      } else if (
        user[outerKey] &&
        targetUser[outerKey] &&
        user[outerKey][innerKey] === targetUser[outerKey][innerKey]
      ) {
        // Si hay coincidencia se suma al score
        score += fieldHandlers[key];
      }
    }
  }

  // Para matcheos cruzados se llama a crossMatchData
  score += crossMatchData(user, targetUser);

  return score;
};

export default calculateMatchScore;
