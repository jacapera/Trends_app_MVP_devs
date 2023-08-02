const { User, Company, conn } = require("../db");

const createNewUser = async (userData) => {
  try {
    // console.log(userData);
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`User could not be created. ${error}`);
  }
};


  // const { data } = companyData;
  try {
    // console.log(data);
    const newCompany = await Company.create(companyData);
    console.log(newCompany);


    return newCompany;
  } catch (error) {
    throw new Error(`Company could not be created. ${error}`);
  }
};

module.exports = {
  createNewCompany,
  createNewUser,
};
