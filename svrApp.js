
/* app.js run on AWS for testing GET/POST requests */

var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 6645);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",function(req,res){
  res.render("home")
});

app.get("/getLoopback",function(req,res){
  var qParams = [];
  for (var p in req.query){
	qParams.push({"name":p,"value":req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render("getLoopback", context);
});

app.post("/postLoopback", function(req, res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({"name":p, "value":req.body[p]});
  }
  var context = {};
  context.dataList = qParams;
  res.render("postLoopback", context);
});

app.use(function(req,res){
  res.type("text/plain");
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});


app.listen(app.get("port"), function(){
  console.log("Express started on http://54.213.219.47:" + app.get("port") + "; press Ctrl-C to terminate.");
});

