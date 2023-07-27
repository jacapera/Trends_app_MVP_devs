const { Student, Profile, Academic, Info } = require("../db");
const { decryptPassword } = require("../helpers/encryptPassword");
const { createToken } = require("../helpers/jwt");

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
    console.log(foundedUser);
    const isCorrectPassword = await foundedUser.profile.comparePassword(user.password)
    if (!isCorrectPassword) return;
    const token = await createToken({ id: foundedUser.id });
    return token;
  } catch (error) {
    throw new Error("Error validating data.");
  }
};

module.exports = validateUser;
