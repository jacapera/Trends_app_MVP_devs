const {
  findOneStudentByProfile,
  findOneProfessionalByProfile,
  findOneCompany,
  findUser,
  findAccount
} = require("../helpers/findUser");
const { createToken } = require("../helpers/jwt");

const userType = (type) => {
  if (type === "company") return findOneCompany;
  return findUser;
};

const validateUser = async (user) => {
  const { email, password } = user;
  try {
    // const findAccount = userType(type);
    const foundedAccount = await findAccount(email);
    // console.log(foundedAccount);
    if (!foundedAccount) return;
    const isCorrectPassword = await foundedAccount.comparePassword(password);
    if (!isCorrectPassword) return;
    const token = await createToken({ id: foundedAccount.id });
    return token;
  } catch (error) {
    throw new Error(`Error validating data. ${error}`);
  }
};

module.exports = validateUser;
