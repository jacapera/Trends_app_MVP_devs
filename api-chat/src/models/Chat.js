const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Chat', {
    chat_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true
    },
    type_chat:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description:{
      type: DataTypes.STRING,
    },
    create_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, { timestamps: false});
};