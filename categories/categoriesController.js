const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new", adminAuth, (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {

  var title = req.body.title;
  if (title != undefined) {

    Category.create({
      title: title,
      slug: slugify(title) // Abreviar titulo para URL OBS: npm install --save slugify
    }).then(() => {
      res.redirect("/admin/categories");
    });

  } else {
    res.redirect("/admin/categories/new");
  }

});

router.get("/admin/categories", (req, res) => {

  Category.findAll().then(categories => {
    res.render("./admin/categories/index", { categories: categories });
  })
});

router.post("/categories/delete", adminAuth, (req, res) => {
  var id = req.body.id;

  if (id != undefined) {
    if (!isNaN(id)) // Verifica se nao eh nuemrico
    {
      Category.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/categories");
      })
    } else {
      res.render("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
})

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;

  if (isNaN(id))
    redirect("/admin/categories");
  else {
    Category.findByPk(id).then(category => {
      if (category != undefined)
        res.render("admin/categories/edit", { category: category });
      else res.redirect("admin/categoria");
    }).catch(erro => {
      res.redirect("/admin/categories");
    });
  }

});

router.post("/categories/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update({ title: title, slug: slugify(title) }, {
    where: {
      id: id
    }
  }).then(() => {
    res.redirect("/admin/categories");
  })

});

module.exports = router; 