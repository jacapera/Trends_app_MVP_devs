const { findAccount } = require("../helpers/findAccount");
const { createToken } = require("../helpers/jwt");

const validateUser = async (user) => {
  const { email, password } = user;
  try {
    const foundedAccount = await findAccount({ email: email });
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
