const {
  Profile,
  Academic,
  Info,
  Student,
  ProfessionalInfo,
  Professional,
  conn,
} = require("../db");

const createNewStudent = async (userData) => {
  const { profile, academic, info } = userData;

  const transaction = await conn.transaction();
  // console.log({ ...profile, ...academic, ...info });
  try {
    const studentProfile = await Profile.create(profile, { transaction });
    const studentAcademic = await Academic.create(academic, { transaction });
    const studentInfo = await Info.create(info, { transaction });
    const createdStudent = await Student.create(
      {
        studentProfile: studentProfile.id,
        studentAcademic: studentAcademic.id,
        studentInfo: studentInfo.id,
      },
      { transaction }
    );
    await transaction.commit();
    return createdStudent;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Student could not be created. ${error}`);
  }
};

const createNewProfessional = async (userData) => {
  const { profile, academic, info } = userData;

  const transaction = await conn.transaction();
  try {
    const professionalProfile = await Profile.create(profile, { transaction });
    const professionalAcademic = await Academic.create(academic, {
      transaction,
    });
    const professionalInfo = await Info.create(info, { transaction });
    const createdProfessional = await Professional.create(
      {
        professionalProfile: professionalProfile.id,
        professionalAcademic: professionalAcademic.id,
        professionalInfo: professionalInfo.id,
      },
      { transaction }
    );
    await transaction.commit();
    return createdProfessional;
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Professional could not be created. ${error}`);
  }
};

const createNewCompany = async (companyData) => {};

module.exports = { createNewProfessional, createNewStudent, createNewCompany };
