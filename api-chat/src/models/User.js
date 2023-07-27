const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    user_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
      isEmail: true,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
    },
    rol:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false,
    defaultScope:{
      attributes:{exclude: ['password']}
    }
  });
};