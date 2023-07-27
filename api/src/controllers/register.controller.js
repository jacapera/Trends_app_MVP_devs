const {
  createNewStudent,
  createNewProfessional,
} = require("../helpers/createUser");
const { createToken } = require("../helpers/jwt");

const userType = (type) => {
  if (type === "student") return createNewStudent;

  if (type === "professional") return createNewProfessional;
};

const registerUser = async (userData) => {
  const { type, profile } = userData;
  try {
    const createUser = userType(type);
    const createdUser = await createUser({ ...userData, type: undefined });
    if (!createdUser) throw new Error(`Error creating a new user. ${error}`);
    const token = await createToken({ id: createdUser.id });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUser;
