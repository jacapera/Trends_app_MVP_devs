const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MessageChatGroup = sequelize.define(
    "messageChatGroup", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  return MessageChatGroup;
};
