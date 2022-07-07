const sequelize = require('sequelize');

const db = new sequelize('nodejs-restapi-2', 'root', '', {
  dialect: 'mysql',
});

db.sync({});

module.exports = db;
