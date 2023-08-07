const { Op, Sequelize, fn, col } = require("sequelize");
const { User, Company, Job } = require("../db");

const getUserById = async (id) => {
    let foundUser;

    foundUser = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!foundUser) {
      foundUser = await Company.findOne({
        where: { id },
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

    if (!foundUser) return null;

    // const plainUser = foundUser.toJSON();

    // const { type } = plainUser;

    // if (type === "student") {
    //   delete plainUser.info_company_name;
    //   delete plainUser.info_position;
    // } else if (type === "professional") {
    //   delete plainUser.academic_level;
    // }

    // return plainUser;
    return foundUser;
};

const getUsers = async (queryParams, userType) => {
    const whereClause = {};
    let hasInvalidQuery = false;
    let userAttributes;

    ["student", "professional"].includes(userType) &&
      (userAttributes = Object.keys(User.rawAttributes));

    userType === "company" &&
      (userAttributes = Object.keys(Company.rawAttributes));

    Object.keys(queryParams).forEach((param) => {
      if (userAttributes.includes(param)) {
        const columnType = User.rawAttributes[param]?.type?.key;

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
        } else if (columnType === "BOOLEAN") {
          const booleanValue = queryParams[param] === "true";
          whereClause[param] = booleanValue;
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

    if (userType === "company") {
      const companies = await Company.findAll({
        where: whereClause,
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

      if (!companies.length) return { error: "No companies found" };

      return companies;
    }
    
    const users = await User.findAll({
      where: whereClause,
      attributes: {
        exclude: [
          "password",
          ...(userType === "student"
            ? ["info_company_name", "info_position"]
            : userType === "professional"
            ? ["academic_level"]
            : []),
        ],
      },
    });

    if (!users.length) return { error: "No users found" };

    return users;
};

const getJobById = async (id) => {
    const foundJob = await Job.findOne({
      where: { id },
    });

    if (!foundJob) return null;

    return foundJob;
};

const getJobs = async (queryParams) => {
  const whereClause = {};
  let hasInvalidQuery = false;
  const jobAttributes = Object.keys(Job.rawAttributes);

  Object.keys(queryParams).forEach((param) => {
    if (jobAttributes.includes(param)) {
      const columnType = Job.rawAttributes[param]?.type?.key;

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
      } else if (columnType === "BOOLEAN") {
        const booleanValue = queryParams[param] === "true";
        whereClause[param] = booleanValue;
      }
    } else {
      hasInvalidQuery = true;
    }
  });

  if (hasInvalidQuery) {
    return { error: "Invalid query" };
  }

  const jobs = await Job.findAll({
    where: whereClause,
  });

  if (!jobs.length) return { error: "No jobs found" };

  return jobs;
};

module.exports = { getUserById, getUsers, getJobById, getJobs };
