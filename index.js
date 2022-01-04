const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const session = require('express-session');

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const usersController = require('./user/UserController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');



// View engine 
app.set('view engine', 'ejs');

//Redis [banco de dados para salvar cache e sessões ]


// Sessions
app.use(session({
  secret: "master",
  cookie: {maxAge: 300000} // Tempo de desconexão automatico 
}))


app.get("/session", (req, res) => {
  req.session.treinamento = "Formacao Node.js";
  req.session.ano = "2019";
  req.session.email = "rafael@gmail.com";
  res.send("Sessao gerada !!")
});

app.get("/leitura", (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    email: req.session.email 
  })
});

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Database

connection
  .authenticate()
  .then(() => {
    console.log("Connexao feita com sucesso!");
  }).catch((erro) => {
    console.log(error);
  });

// Rotas //

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {

    Category.findAll().then(categories => {
      res.render("index", { articles: articles, categories: categories })
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render("article", { article: article, categories: categories })
      });
    } else {
      res.redirect("/");
    }
  }).catch(err => {
    res.redirect("/");
  })
})

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;

  Category.findOne({
    where:{slug: slug
    },
    include: [{model: Article}]
  }).then( category => {
    if(category != undefined){
      Category.findAll().then(categories => {
        res.render("index", {articles: category.articles, categories: categories})
      })
    }else{
      res.redirect("/")
    }
  })
})

app.listen(8080, () => {
  console.log("O Servidor esta rodando na porta 8080 ");
})