const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Group', {
    group_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true
    },
    name:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description:{
      type: DataTypes.STRING,
    }
  }, { timestamps: false});
};