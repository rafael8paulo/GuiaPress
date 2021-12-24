const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress', 'root', 'master', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
