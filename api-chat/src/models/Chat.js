const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Chat', {
    chat_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true
    },
    created_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, { timestamps: false});
};