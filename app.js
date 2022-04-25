//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


//Coneccion a MONGODB local o Atlas & definicion de Collectios
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

// mongoose.connect("mongodb+srv://rikmarquez:test1234@cluster0.sdwuo.mongodb.net/wikiDB", {
//   useNewUrlParser: true
// });

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = new mongoose.model("Article", articlesSchema);


//ROUTING
app.get("/", function(req, res) {
  res.render("home");
});

// API de Articulos
app.route("/articles")
    .get(function(req, res){
      Article.find({}, function(err, articles){
        if (!err) {
          res.send(articles);
        } else {
          res.send(err);
        }
      });
    })

    .post(function(req, res) {
      const article = new Article({
        title: req.body.title,
        content: req.body.content
      });
      article.save(function(err){
        if (!err) {
          res.send("Articulo creado exitosamente!");
          console.log("Creamos un nuevo articulo en wikiDB..." + req.body.title);
        } else {
          res.send(err);
        }
      });
    })

    .delete(function(req, res){
      Article.deleteMany({}, function(err){
        if (!err) {
          res.send("Todos los articulos se han borrado exitosamente!");
          console.log("Todos los articulos se han borrado");
        } else {
          res.send(err);
        };
      });
    });


// API para accesar un articulo especifico
app.route("/articles/:articleTitle")

    .get(function(req, res){
      Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (!err) {
          if (foundArticle) {
            res.send(foundArticle);
            console.log(foundArticle);
          } else {
            res.send("No se encontro ese titulo")
          }
        } else {
          res.send(err);
        }
      });
    })

    .put(function(req, res){
      Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err){
          if (!err){
            res.send("Se actualizo exitosamente el articulo");
            console.log("Se actualizo exitosamente -"+req.params.articleTitle);
          }
        }
      )
    })

    .patch(function(req, res){
      Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err){
          if (!err){
            res.send("Se actualizo exitosamente el articulo");
            console.log("Se actualizo exitosamente -"+req.params.articleTitle);
          }
        }
      )
    })

    .delete(function(req, res){
      Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
          if (!err) {
            res.send("Articulo eliminado exitosamente");
          } else {
            res.send(err);
          }
        }
      )
    });



// Arrancando servidor NODE (Express)
app.listen(3000, function() {
  console.log("Server started successfully - PORT 3000");
});
