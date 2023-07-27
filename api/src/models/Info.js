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
        // validate: {
        //   isIn: {
        //     args: [
        //       "Elegir una carrera",
        //       "Encontrar una pasantía o trabajo",
        //       "Conocer más sobre el mercado laboral de mi profesión",
        //       "Profundizar en mis estudios",
        //       "Elegir una especialización",
        //       "Conocer nuevos colegas y oportunidades",
        //       "Conseguir un trabajo",
        //       "Hacer una especialización",
        //       "Emprender",
        //     ],
        //     msg: "Invalid goal",
        //   },
        // },
      },
      interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      problematic: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        // validate: {
        //   isIn: {
        //     args: [
        //       "No sé que es lo que me gusta",
        //       "Falta de información del mercado laboral",
        //       "Falta de guía profesional",
        //       "Dificultad para conseguir trabajo",
        //     ],
        //     msg: "Invalid problematic.",
        //   },
        // },
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isIn: {
        //     args: ["Full-time", "Part-time"],
        //     msg: "Invalid availability.",
        //   },
        // },
      },
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isIn: {
        //     args: ["Remoto", "Híbrido", "Presencial"],
        //     msg: "Invalid contract type.",
        //   },
        // },
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
