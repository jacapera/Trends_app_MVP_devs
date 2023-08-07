const { DataTypes } = require("sequelize");
const { DEFAULT_IMG } = require("../../config");

module.exports = (sequelize) => {
  const ChatGroup = sequelize.define("chatGroup", {
    ownerId: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DEFAULT_IMG,
      validate: { isUrl: true },
      set(value) {
        this.setDataValue("image", value || DEFAULT_IMG);
      },
    },
  });
  return ChatGroup;
};
