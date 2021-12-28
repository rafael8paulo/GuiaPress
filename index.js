const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection =require('./database/database');


const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');



// View engine 
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Database

connection
  .authenticate()
  .then(() => {
    console.log("Connexao feita com sucesso!");
  }).catch((erro)=> {
    console.log(error);
  });

// Rotas //

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res)=> {
  Article.findAll().then(articles => {
    res.render("index", {articles: articles})
  });  
});

app.listen(8080, () => {
  console.log("O Servidor esta rodando na porta 8080 ");
})