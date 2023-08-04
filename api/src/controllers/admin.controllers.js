const { Company, User } = require("../db");

const findAllUsers = async () => {
  try {
    const users = await User.scope("withoutPassword").findAll();
    const companies = await Company.scope("withoutPassword").findAll();
    return [...users, ...companies];
  } catch (error) {
    throw new Error("Cannot find users.");
  }
};

module.exports = { findAllUsers };
