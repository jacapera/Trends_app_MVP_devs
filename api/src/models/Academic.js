const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Academic = sequelize.define(
    "academic",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isIn: {
        //     args: [
        //       "Secundaria",
        //       "Universitario Junior",
        //       "Universitario Intermedio",
        //       "Universitario Avanzado",
        //       "Sin Experiencia",
        //       "Junior",
        //       "Middle",
        //       "Senior",
        //     ],
        //     msg: "Invalid academic type.",
        //   },
        // },
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      graduation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Academic;
};
