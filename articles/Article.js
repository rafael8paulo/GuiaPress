const Sequelize =require("sequelize");
const connection = require("../database/database");
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },slug: {
    type: Sequelize.STRING,
    allowNull: false
  },body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
Category.hasMany(Article); // Uma categoria tem muitos artigos (1 - P - M )
Article.belongsTo(Category); //Meu artigo pertence a uma categoria (1 - P - 1)

// Article.sync({force: true}); //Criar a tabela sempre que axecutar o progrma

module.exports = Article;