const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Info = sequelize.define(
    "info",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      career: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      goals: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      problematic: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      scopes: {
        withoutId: {
          attributes: { exclude: ["id"] },
        },
      },
    }
  );

  return Info;
};
