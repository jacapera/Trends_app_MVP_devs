const { findAllUsers } = require("../controllers/admin.controllers");

const createAdmin = (req, res) => {};

const getUsers = async (req, res) => {
  try {
    const allUsers = await findAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroups = (req, res) => {};

const getMessages = (req, res) => {};

module.exports = { createAdmin, getGroups, getUsers, getMessages };
