const { User, Company } = require("../db");

const findAccount = async (email) => {
  try {
    const foundedCompany = await Company.findOne({
      where: {
        email: email,
      },
    });
    const foundedUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!foundedCompany && !foundedUser) return;
    return foundedUser || foundedCompany;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAccount };
