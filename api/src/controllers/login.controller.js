const { findAccount } = require("../helpers/findAccount");
const { createToken } = require("../helpers/jwt");

/*
const { Student, Profile, Academic, Info } = require("../db");
const { decryptPassword } = require("../helpers/encryptPassword");

const validateUser = async (user) => {
  try {
    const foundedUser = await Student.findOne({
      attributes: ["id"],
      include: {
        model: Profile,
        where: {
          email: user.email,
        },
      },
    });
    if (!foundedUser) return;
    const correctPassword = await decryptPassword(
      user.password,
      foundedUser.profile.password
    );
    if (!correctPassword) return;
    const token = await createToken({ id: foundedUser.id });
    return token;
  } catch (error) {
    throw new Error("Error validating data.");
  }
};
*/

const validateUser = async (user) => {
	const { email, password } = user;
	try {
		const foundedAccount = await findAccount({ email: email });
		// console.log(foundedAccount);
		if (!foundedAccount) return;
		const isCorrectPassword = await foundedAccount.comparePassword(
			password
		);
		if (!isCorrectPassword) return;
		const token = await createToken({ id: foundedAccount.id });
		return token;
	} catch (error) {
		throw new Error(`Error validating data. ${error}`);
	}
};

module.exports = validateUser;
