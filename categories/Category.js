const Sequelize =require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Category.sync({force: false}); //Criar a tabela sempre que axecutar o progrma (false: só cria se não existir)

module.exports = Category;