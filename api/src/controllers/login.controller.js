const {
  findOneStudentByProfile,
  findOneProfessionalByProfile,
  findOneCompany,
} = require("../helpers/findUser");
const { createToken } = require("../helpers/jwt");

const userType = (type) => {
  if (type === "student") return findOneStudentByProfile;

  if (type === "professional") return findOneProfessionalByProfile;

  //if (type === "company") return findOneCompany;
};

const validateUser = async (user) => {
  const { type, email, password } = user;
  try {
    const findUser = userType(type);
    const foundedUser = await findUser("email", email);
    // console.log(foundedUser);
    if (!foundedUser) return;
    const isCorrectPassword = await foundedUser.profile.comparePassword(
      password
    );
    if (!isCorrectPassword) return;
    const token = await createToken({
      id: foundedUser.id,
      type,
      profile: { ...foundedUser.profile.dataValues, password: undefined },
      academic: foundedUser.academic.dataValues,
      info: foundedUser.info.dataValues,
    });
    return token;
  } catch (error) {
    throw new Error(`Error validating data. ${error}`);
  }
};

module.exports = validateUser;
