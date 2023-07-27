const { DataTypes } = require("sequelize");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");

module.exports = (sequelize) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 55],
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuit: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[0-9]+$/,
        len: [7, 13],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
      validate: { isUrl: true },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Company.beforeSave(async (company) => {
    if (company.changed("password"))
      company.password = await encryptPassword(company.password);
  });

  Company.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return Company;
};
