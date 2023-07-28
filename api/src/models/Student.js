const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "student",
      },
    },
    { timestamps: false }
  );

  return Student;
};
