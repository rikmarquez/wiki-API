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

mongoose.connect("mongodb://localhost:27017/wiki-API", {
  useNewUrlParser: true
});

// mongoose.connect("mongodb+srv://rikmarquez:test1234@cluster0.sdwuo.mongodb.net/todolistDB", {
//   useNewUrlParser: true
// });

// Creando la collection: items & alta de articulos por default
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = new mongoose.model("Article", ItemsSchema);


//ROUTING
app.get("/", function(req, res) {

});


app.get("/:customRoute", function(req, res){

});


app.post("/", function(req, res) {

});

app.listen(3000, function() {
  console.log("Server started successfuly - PORT 3000");
});
