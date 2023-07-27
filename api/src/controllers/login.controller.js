const { Student, Profile, Academic, Info } = require("../db");
const { createToken } = require("../helpers/jwt");

const validateUser = async (user) => {
  try {
    const foundedUser = await Student.findOne({
      attributes: ["id"],
      include: [
        {
          model: Profile.scope("withoutId"),
          where: {
            email: user.email,
          },
        },
        { model: Academic.scope("withoutId") },
        { model: Info.scope("withoutId") },
      ],
    });
    if (!foundedUser) return;
    const isCorrectPassword = await foundedUser.profile.comparePassword(
      user.password
    );
    if (!isCorrectPassword) return;
    const token = await createToken({
      user: {
        id: foundedUser.id,
        type: "student",
        profile: { ...foundedUser.profile.dataValues, password: undefined },
        academic: foundedUser.academic,
        info: foundedUser.info,
      },
    });
    return token;
  } catch (error) {
    throw new Error(`Error validating data. ${error}`);
  }
};

module.exports = validateUser;
