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

const createNewProfessional = async (userData, hashedPassword) => {};

module.exports = { createNewProfessional, createNewStudent };
