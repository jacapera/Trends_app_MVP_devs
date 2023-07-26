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
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
    },
    session:{
      type: DataTypes.BOOLEAN,
      default: false,
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