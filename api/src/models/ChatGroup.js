const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ChatGroup = sequelize.define(
    "chatGroup", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return ChatGroup;
};
