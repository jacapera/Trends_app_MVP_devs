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
  const { type } = userData;
  try {
    const createUser = userType(type);
    const createdUser = await createUser({ ...userData, type: undefined });
    if (!createdUser.id || !createdUser) throw new Error(`Error creating a new user. ${error}`);
    // console.log(createdUser.id);
    const token = await createToken({
      user: { id: createdUser.id, ...userData },
    });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = registerUser;

//{ body : {profile: createdUser.profile, academic: createdUser.academic, info: createdUser.info}
