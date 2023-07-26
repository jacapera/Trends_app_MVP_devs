const {
  createNewStudent,
  createNewProfessional,
} = require("../libs/createUser");
const { encryptPassword } = require("../libs/encryptPassword");
const { createToken } = require("../libs/jwt");

const userType = (type) => {
  if (type === "student") return createNewStudent;

  if (type === "professional") return createNewProfessional;
};

const registerUser = async (userData) => {
  const { type, profile } = userData;
  try {
    const hashedPassword = await encryptPassword(profile.password);
    const createUser = userType(type);
    const createdUser = await createUser(
      { ...userData, type: undefined },
      hashedPassword
    );
    if (!createdUser) throw new Error(`Error creating a new user. ${error}`);
    const token = await createToken({ id: createdUser.id });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUser;
