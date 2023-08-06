const { findAllUsers, createNewAdmin } = require("../controllers/admin.controllers");
const { getAllGroups } = require("../controllers/chatroom.controller");

const createAdmin = async (req, res) => {
  const newAdmin = req.body;
  try {
    const result = await createNewAdmin(newAdmin);
    if (!result) throw new Error("Cannot create user.");
    res.status(200).json("User create successfully.")
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await findAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const allGroups = await getAllGroups(null, "admin");

    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = (req, res) => {};

module.exports = { createAdmin, getGroups, getUsers, getMessages };
