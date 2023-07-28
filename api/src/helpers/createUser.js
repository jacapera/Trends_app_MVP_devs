const { User, Company, conn } = require("../db");

const {
	Profile,
	Academic,
	Info,
	Student,
	InfoProfessional,
	Professional,
	conn,
} = require("../db");

/*
const createNewUser = async (userData) => {
  try {
    // console.log(userData);
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`User could not be created. ${error}`);
  }
};
*/

const createNewStudent = async (userData, hashedPassword) => {
	const { profile, academic, info } = userData;
	const transaction = await conn.transaction();
	// console.log(hashedPassword);
	// console.log({ ...profile, ...academic, ...info });
	try {
		const studentProfile = await Profile.create(
			{ ...profile, password: hashedPassword },
			{ transaction }
		);
		const studentAcademic = await Academic.create(academic, {
			transaction,
		});
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

// const createNewProfessional = async (userData, hashedPassword) => {};

const createNewCompany = async (companyData) => {
	const { data } = companyData;
	try {
		// console.log(data);
		const newCompany = await Company.create(data);
		console.log(newCompany);
		return newCompany;
	} catch (error) {
		throw new Error(`Company could not be created. ${error}`);
	}
};

module.exports = {
	createNewCompany,
	createNewProfessional,
	createNewStudent,
};
