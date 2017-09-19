//server.js file is only responsible for routes
var express = require("express");
var bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

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

//Get route by id
app.get("/todos/:id", (req, res) => {
  var id = req.params.id
   //validate id by using isValid
    //if not valid respond with a 404 empty body
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //findbyId
  Todo.findById(id).then((todo) => {
    // if no todo - send back 404 with empty body
      if(!todo) {
        return res.status(404).send();
      }
      //success
      //if todo - send back
      res.send({todo});

  }).catch((e) => {
     //error
      //400 send empty body back
     res.status(400).send();
  });
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