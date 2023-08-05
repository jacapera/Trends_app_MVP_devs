const { getUserById, getJobById } = require("./search.controller");
const { matcher } = require("../helpers/matchingAlgorithm/matcher.js");
const { User, Company, Job, Admin } = require("../db");
const { findAccount } = require("../helpers/findAccount");

const getUserProfile = async (user) => {
  let foundedUser = null;
  try {
    if (user.type.toLowerCase() === "company")
      foundedUser = await Company.scope(
        "withoutId",
        "withoutPassword"
      ).findByPk(user.id);
    if (user.type.toLowerCase() === "professional")
      foundedUser = await User.scope("withoutId", "withoutPassword").findByPk(
        user.id
      );
    if (user.type.toLowerCase() === "student")
      foundedUser = await User.scope(
        "withoutId",
        "withoutPassword",
        "student"
      ).findByPk(user.id);
    if (user.type.toLowerCase() === "admin")
      foundedUser = await Admin.scope("withoutId", "withoutPassword").findByPk(
        user.id
      );
    return foundedUser;
  } catch (error) {
    throw new Error("Could not find user in db.");
  }
};

const changeUserPassword = async (userId, newPassword, currentPassword) => {
  try {
    const foundedUser = await findAccount({ id: userId });
    if (!foundedUser)
      throw new Error("No valid user found to change password.");
    if (!(await foundedUser.comparePassword(currentPassword)))
      throw new Error(
        "The entered password does not match the saved password."
      );
    if (currentPassword === newPassword)
      throw new Error(
        "The current password has to be different from the previous one."
      );
    return await foundedUser.update({ password: newPassword });
  } catch (error) {
    throw new Error(error.message);
  }
};

const putUserProfile = async (profile, profileData) => {
  try {
    const foundProfile = profile;
    const updatedProfile = await foundProfile.update(profileData);

    return updatedProfile;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteUserProfile = async (id) => {
  try {
    const deletedProfile = await User.destroy({ where: { id } });

    return deletedProfile;
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

module.exports = {
  getUserFeed,
  getUserProfile,
  putUserProfile,
  deleteUserProfile,
  changeUserPassword,
};
