const { Company, User, Admin } = require("../db");

const findAllUsers = async () => {
  const users = await User.scope("withoutPassword").findAll();
  const companies = await Company.scope("withoutPassword").findAll();
  return [...users, ...companies];
};

const createNewAdmin = async (userData) => {
  if (await Admin.findOne({ where: { username: userData.username } }))
    throw new Error("This username already exists.");
  return await Admin.create(userData);
};

module.exports = { findAllUsers, createNewAdmin };
