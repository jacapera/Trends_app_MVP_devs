const { Company, User } = require("../../db");

module.exports = async () => {
  const users = await User.scope("withoutPassword").findAll();
  const companies = await Company.scope("withoutPassword").findAll();
  return [...users, ...companies];
};
