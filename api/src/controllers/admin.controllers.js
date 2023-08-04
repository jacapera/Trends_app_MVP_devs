const { Company, User, Admin } = require("../db");

const findAllUsers = async () => {
  try {
    const users = await User.scope("withoutPassword").findAll();
    const companies = await Company.scope("withoutPassword").findAll();
    return [...users, ...companies];
  } catch (error) {
    throw new Error("Cannot find users.");
  }
};

const createNewAdmin = async (userData) => {
  try {
    if (await Admin.findOne({ where: { username: userData.username } }))
      throw new Error("This username already exists.");
    return await Admin.create(userData);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { findAllUsers, createNewAdmin };
