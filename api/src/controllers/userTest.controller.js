const { User } = require("../db");

const postUserTest = async (userData) => {
  try {
    const newUser = await User.create(userData);

    const user = await User.findOne({
      where: { id: newUser.id },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postUserTest;
