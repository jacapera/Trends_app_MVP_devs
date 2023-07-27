const {
  Profile,
  Academic,
  Info,
  Student,
} = require("../db");

const getUsers = async () => {
  try {
    const users = await Student.findAll({
      include:[Profile, Academic, Info]
    })
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getUsers;