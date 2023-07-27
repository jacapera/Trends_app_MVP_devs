const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const InfoProfessional = sequelize.define(
    "infoProfessional",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return InfoProfessional;
};
