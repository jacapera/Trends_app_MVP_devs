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
      type: {
        type: DataTypes.STRING,
        defaultValue: "professional",
      },
      infoId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    { timestamps: false }
  );

  return Professional;
};
