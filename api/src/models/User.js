const { DataTypes } = require("sequelize");
const { encryptPassword, decryptPassword } = require("../helpers/encryptPassword");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 33],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 55],
        },
      },
      profile_bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 18,
        validate: {
          isNumeric: true,
          isInt: true,
          min: 12,
          max: 102,
        },
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
        //si no se proporciona una url, se establece este valor por defecto
        defaultValue:
          "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        validate: { isUrl: true },
        set(value) {
          // Si el valor es un string vacío, lo convierte a null
          this.setDataValue("profile_image", value || null);
        },
      },
      profile_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_support: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      academic_formation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academic_area: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      academic_graduation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info_company_name: {
        type: DataTypes.STRING,
        allowNull: true,
        //allowNull: (user) => user.type.toLowerCase() !== "professional",
      },
      info_position: {
        type: DataTypes.STRING,
        allowNull: true,
        //allowNull: (user) => user.type.toLowerCase() !== "professional",
      },
      info_career: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_goals: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_problematic: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      info_availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info_contract: {
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
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
        student: {
          attributes: { exclude: ["info_company_name", "info_position"] },
        },
      },
    }
  );

  User.beforeSave(async (user) => {
    if (user.changed("password"))
      user.password = await encryptPassword(user.password);
  });

  User.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return User;
};
