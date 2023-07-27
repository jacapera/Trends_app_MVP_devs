const {
  Profile,
  Academic,
  Info,
  Student,
  ProfessionalInfo,
  Professional,
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

const findOneCompany = async (prop, data) => {};

module.exports = { findOneStudentByProfile, findOneProfessionalByProfile, findOneCompany };
