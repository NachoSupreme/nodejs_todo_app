//server.js file is only responsible for routes
var express = require("express");
var bodyParser = require("body-parser");


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");

var app = express();

//app.use will create a middleware for all API routes
app.use(bodyParser.json());


//Create route
app.post("/todos", (req, res)=> {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});


//Read route
app.get("/todos", (req, res)=> {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});


//Update route
app.post("/", (req, res)=> {

});

//Delete route
app.post("/", (req, res)=> {

});



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


module.exports = {app};