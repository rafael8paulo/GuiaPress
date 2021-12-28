const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Articles = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  Articles.findAll({
    include: [{model: Category}] // INNER JOIN
  }).then(articles => {
    res.render("admin/articles/index", {articles, articles});
  })
  
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", {categories: categories})
  })
 
});

router.post("/articles/save", (req, res) =>{
  var title = req.body.title;
  var body = req.body.body;
  var id = req.body.category;

  Articles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: id
  }).then(() => {
    res.redirect("/admin/articles");
  })

});

router.post("/articles/delete", (req, res) => {
  var id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) // Verifica se nao eh nuemrico
    {
      Articles.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/admin/articles');
      })
    } else { // nao for numero
      res.render('/admin/articles');
    }
  } else {
    res.redirect('/admin/articles');
  }
})

module.exports = router;