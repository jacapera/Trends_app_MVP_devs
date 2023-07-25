const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    message_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content:{
      type: DataTypes.TEXT,
    },
    created_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {timestamps: false});
};