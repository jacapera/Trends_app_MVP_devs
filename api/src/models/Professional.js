const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Professional = sequelize.define(
    "professional",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      infoId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Professional;
};
