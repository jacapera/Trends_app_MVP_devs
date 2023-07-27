const { Op, Sequelize, fn, col } = require("sequelize");
const { Student, Professional, Profile, Academic, Info, InfoProfessional } = require("../db");

const getUserById = async (id) => {
  try {
    foundUser = await Student.findByPk(id, {  // faltan professionals
      attributes: [],
      include: [
        {
          model: Profile,
        },
        {
          model: Academic,
        },
        {
          model: Info,
        },
      ],
    });

    return foundUser;
  } catch (error) {
    return { error: "User not found!" };
  }
};

const getUsers = async (queryParams, userType) => {
  try {
    const whereClause = {};
    let hasInvalidQuery = false;

    Object.keys(queryParams).forEach((param) => {
      if (
        [
          "area",
          "career",
          "skills",
          "goals",
          "interests",
          "problematic",
          "languages",
        ].includes(param)
      ) {
        whereClause[`$info.${param}$`] = {
          [Op.overlap]: [queryParams[param]],
        };
        whereClause[`$info.${param}$`] = Sequelize.where(
          fn("array_to_string", col(`info.${param}`), ","),
          {
            [Op.iLike]: `%${queryParams[param]}%`,
          }
        );
      } else if (Profile.rawAttributes[param]) {
        whereClause[`$profile.${param}$`] = {
          [Op.iLike]: `%${queryParams[param]}%`,
        };
      } else if (Academic.rawAttributes[param]) {
        whereClause[`$academic.${param}$`] = {
          [Op.iLike]: `%${queryParams[param]}%`,
        };
      } else if (Info.rawAttributes[param]) {
        whereClause[`$info.${param}$`] = {
          [Op.iLike]: `%${queryParams[param]}%`,
        };
      } else hasInvalidQuery = true;
    });

    if (hasInvalidQuery) {
      return { error: "Invalid query" };
    }

    let users;

    if (userType === "student") {
      users = await Student.findAll({
        where: whereClause,
        include: [
          {
            model: Profile,
            as: "profile",
          },
          {
            model: Academic,
            as: "academic",
          },
          {
            model: Info,
            as: "info",
          },
        ],
      });
    } else if (userType === "professional") {
      users = await Professional.findAll({
        where: whereClause,
        include: [
          {
            model: Profile,
            as: "profile",
          },
          {
            model: Academic,
            as: "academic",
          },
          {
            model: Info,
            as: "info",
          },
          {
            model: InfoProfessional,
            as: "infoProfessional",
          },
        ],
      });
    }

    if (!users.length) return { error: "No users found" };

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return { error: error };
  }
};

module.exports = { getUserById, getUsers };
