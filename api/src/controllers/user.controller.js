const { getUserById, getJobById } = require("./search.controller");
const { matcher } = require("../helpers/matchingAlgorithm/matcher.js");
const { User, Company, Job } = require("../db");

const putProfile = async (profile, profileData) => {
  try {
    const foundProfile = profile;
    const updatedProfile = await foundProfile.update(profileData);
    
    return updatedProfile;
  } catch (error) {
    return { error: error.message };
  }
};

const getUserFeed = async (id, usersType) => {
  try {
    let target;

    // Se obtiene el usuario objetivo por su id
    target = await getUserById(id);

    // Si el id no corresponde a un usuario
    // se verifica si es de un trabajo
    if (!target) {
      target = await getJobById(id);
    }
    if (!target) {
      return { error: "Nothing found!" };
    }

    // Se obtiene la lista de usuarios con el type especificado
    let users;

    users = await User.findAll({
      where: { type: usersType },
      attributes: {
        exclude: [
          "password",
          ...(usersType === "student"
            ? ["info_company_name", "info_position"]
            : usersType === "professional"
            ? ["academic_level"]
            : []),
        ],
      },
    });

    if (!users.length) {
      users = await Company.findAll({
        attributes: {
          exclude: ["password"],
        },
        include: {
          model: Job,
          attributes: {
            exclude: ["companyId"],
          },
        },
      });
    }

    // Se calcula el feed utilizando el algoritmo de matcheo
    const matches = matcher(users, target);

    return matches;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getUserFeed, putProfile };
