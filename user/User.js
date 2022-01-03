const Sequelize =require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

User.sync({force: false}); //Criar a tabela sempre que axecutar o progrma (false: só cria se não existir)

module.exports = User;