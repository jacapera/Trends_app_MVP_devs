const { DataTypes } = require("sequelize");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");

module.exports = (sequelize) => {
  const Profile = sequelize.define(
    "profile",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 55],
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 33],
        },
      },
      age: {
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
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
        validate: { isUrl: true },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      support: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      // defaultScope: {
      //   attributes: { exclude: ["password"] },
      // },
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

  //se utiliza este hook para encriptar la password
  Profile.beforeSave(async (profile) => {
    if (profile.changed("password"))
      profile.password = await encryptPassword(profile.password);
  });

  Profile.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return Profile;
};
