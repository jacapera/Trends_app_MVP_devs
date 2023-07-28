const { Op, Sequelize, fn, col } = require("sequelize");
const { User } = require("../db");

const getUserById = async (id) => {
  try {
    let foundUser = await User.findOne({
      where: { id },
      attributes: [],
    });

    if (!foundUser) {
      return { error: "User not found!" };
    }

    return foundUser;
  } catch (error) {
    return { error: "Error searching user!" };
  }
};

const getUsers = async (queryParams, userType) => {
  try {
    const whereClause = {};
    let hasInvalidQuery = false;

    const userAttributes = Object.keys(User.rawAttributes);

    Object.keys(queryParams).forEach((param) => {
      if (userAttributes.includes(param)) {
        const columnType = User.rawAttributes[param].type.key;

        if (columnType === "ARRAY") {
          whereClause[param] = {
            [Op.overlap]: [queryParams[param]],
          };
          whereClause[param] = Sequelize.where(
            fn("array_to_string", col(param), ","),
            {
              [Op.iLike]: `%${queryParams[param]}%`,
            }
          );
        } else if (columnType === "STRING") {
          whereClause[param] = {
            [Op.iLike]: `%${queryParams[param]}%`,
          };
        }
      } else {
        hasInvalidQuery = true;
      }
    });

    if (hasInvalidQuery) {
      return { error: "Invalid query" };
    }

    if (userType) {
      whereClause["type"] = {
        [Op.iLike]: `%${userType}%`,
      };
    }

    const users = await User.findAll({
      where: whereClause,
    });

    if (!users.length) return { error: "No users found" };

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return { error: error };
  }
};

module.exports = { getUserById, getUsers };
