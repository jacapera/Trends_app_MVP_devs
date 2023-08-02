const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define(
    "image", 
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filepath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  return Image;
};
