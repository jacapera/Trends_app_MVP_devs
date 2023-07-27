const {
  createNewStudent,
  createNewProfessional,
  createNewCompany,
  createNewUser
} = require("../helpers/createUser");
const { createToken } = require("../helpers/jwt");

const userType = (type) => {
  if (type.toLowerCase() === "company") return createNewCompany;
  return createNewUser;
};

const registerUser = async (userData) => {
  const { type } = userData;
  try {
    const createNewAccount = userType(type);
    const createdUser = await createNewAccount(userData);
    if (!createdUser.id || !createdUser)
      throw new Error(`Error creating a new user. ${error}`);
    // console.log(createdUser.id);
    const token = await createToken({ id: createdUser.id });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUser;

//{ body : {profile: createdUser.profile, academic: createdUser.academic, info: createdUser.info}
