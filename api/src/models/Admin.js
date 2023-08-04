const { DataTypes } = require("sequelize");
const { DEFAULT_IMG } = require("../../config");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");

module.exports = (sequelize) => {
  const Admin = sequelize.define(
    "admin",
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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 15],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: DEFAULT_IMG,
        validate: { isUrl: true },
        set(value) {
          // Si el valor es un string vacío, lo convierte a null
          this.setDataValue("image", value || DEFAULT_IMG);
        },
      },
    },
    {
      scopes: {
        withoutId: {
          attributes: { exclude: ["id"] },
        },
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );

  Admin.beforeSave(async (admin) => {
    if (admin.changed("password"))
      admin.password = await encryptPassword(admin.password);
  });

  Admin.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return Admin;
};
