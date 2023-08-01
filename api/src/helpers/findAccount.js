const { User, Company } = require("../db");

const findAccount = async (prop) => {
  try {
    const foundedCompany = await Company.findOne({
      where: prop,
    });
    const foundedUser = await User.findOne({
      where: prop,
    });
    // console.log(`findAccount: ${foundedCompany}`);
    // console.log(`findAccount: ${foundedUser}`);
    if (!foundedCompany && !foundedUser) return;
    return foundedUser || foundedCompany;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAccount };
