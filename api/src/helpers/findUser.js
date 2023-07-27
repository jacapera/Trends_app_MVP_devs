const {
  Profile,
  Academic,
  Info,
  Student,
  ProfessionalInfo,
  Professional,
  User,
  Company,
} = require("../db");

const findOneStudentByProfile = async (prop, data) => {
  return await Student.findOne({
    attributes: ["id"],
    include: [
      {
        model: Profile.scope("withoutId"),
        where: {
          [prop]: data,
        },
      },
      { model: Academic.scope("withoutId") },
      { model: Info.scope("withoutId") },
    ],
  });
};

const findOneProfessionalByProfile = async (prop, data) => {
  return await Professional.findOne({
    attributes: ["id"],
    include: [
      {
        model: Profile.scope("withoutId"),
        where: {
          [prop]: data,
        },
      },
      { model: Academic.scope("withoutId") },
      { model: Info.scope("withoutId") }, //<----------- se tiene que cambiar a infoProfessional
    ],
  });
};

const findAccount = async (email) => {
  try {
    const foundedCompany = await Company.findOne({
      where: {
        email: email,
      },
    });
    const foundedUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!foundedCompany && !foundedUser) return;
    return foundedUser || foundedCompany;
  } catch (error) {
    throw error;
  }
};

const findOneCompany = async (prop, data) => {};

module.exports = {
  findOneStudentByProfile,
  findOneProfessionalByProfile,
  findOneCompany,
  findAccount
};
