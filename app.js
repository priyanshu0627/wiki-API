//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
  title : String,
  content : String
};

const Article = mongoose.model("Article",articleSchema);

app.route("/articles")
  .get(function(req,res){
    Article.find({},function(err,data){
      if (err) {
        console.log("error from get/articles");
      } else {
        res.send(data);
      }
    });
  })
  .post(function(req,res){
    const newEntry = new Article({
      title : req.body.title,
      content : req.body.content
    });

    newEntry.save(function(err){
      if (err) {
        console.log("error from post/");
        res.send("error from post/")
      } else {
        res.send("successfully posted "+ newEntry);
      }
    });
  })
  .delete(function(req,res){
    Article.deleteMany({},function(err,data){
      if (err) {
        res.send(err);
      } else {
        res.send("successfully delete");
      }
    });
  });


app.listen(process.env.PORT || 3000 , function(req,res) {
  console.log("Server Started");
});
