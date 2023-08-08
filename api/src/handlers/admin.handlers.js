const {
  findAllUsers,
  createNewAdmin,
  totalChats,
  totalMessages,
} = require("../controllers/admin.controllers");
const { getAllGroups } = require("../controllers/chatroom.controllers");

const createAdmin = async (req, res) => {
  const newAdmin = req.body;
  try {
    const result = await createNewAdmin(newAdmin);
    if (!result) throw new Error("Cannot create user.");
    res.status(200).json("User create successfully.");
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

const getMessages = async (req, res) => {
  const { userType } = req.params;
  console.log(userType);
  try {
    if (
      userType.toLowerCase() !== "student" &&
      userType.toLowerCase() !== "professional"
    )
      throw new Error("Invalid params.");
    const result = await totalMessages(userType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChats = async (req, res) => {
  const { userType } = req.params;
  try {
    if (
      userType.toLowerCase() !== "student" &&
      userType.toLowerCase() !== "professional"
    )
      throw new Error("Invalid params.");
    const result = await totalChats(userType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAdmin, getChats, getGroups, getUsers, getMessages };
