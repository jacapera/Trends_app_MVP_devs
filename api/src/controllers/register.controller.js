const { createNewCompany, createNewUser } = require("../helpers/createUser");
const { createToken } = require("../helpers/jwt");

const { encryptPassword } = require("../helpers/encryptPassword");

const userType_company = (type) => {
	if (type.toLowerCase() === "company") return createNewCompany;
	return createNewUser;
};

const registerUser_company = async (userData) => {
	const { type } = userData;
	try {
		const createNewAccount = userType_company(type);
		const createdAccount = await createNewAccount(userData);
		if (!createdAccount.id || !createdAccount)
			throw new Error(`Error creating a new user. ${error}`);
		// console.log(createdAccount.id);
		const token = await createToken({ id: createdAccount.id });
		return token;
	} catch (error) {
		throw new Error(error.message);
	}
};

const userType = (type) => {
	if (type === "student") return createNewStudent;

	if (type === "professional") return createNewProfessional;
};

const registerUser = async (userData) => {
	const { type, profile } = userData;
	try {
		const hashedPassword = await encryptPassword(profile.password);
		const createUser = userType(type);
		const createdUser = await createUser(
			{ ...userData, type: undefined },
			hashedPassword
		);
		if (!createdUser)
			throw new Error(`Error creating a new user. ${error}`);
		const token = await createToken({ id: createdUser.id });
		return token;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = registerUser;

//{ body : {profile: createdUser.profile, academic: createdUser.academic, info: createdUser.info}
