const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProfessionalInfo = sequelize.define(
    "professionalInfo",
    {
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

  return ProfessionalInfo;
};
