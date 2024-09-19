// message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const message = sequelize.define('message', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Define o valor padrão como a data e hora atual
  }
});

module.exports = message;
