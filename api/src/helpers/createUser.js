const { User, conn } = require("../db");

const createNewUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`User could not be created. ${error}`);
  }
};

const createNewCompany = async (companyData) => {};

module.exports = {
  createNewCompany,
  createNewUser,
};
