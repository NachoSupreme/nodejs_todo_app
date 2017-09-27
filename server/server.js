require("./config/config.js");

//server.js file is only responsible for routes
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
var {authenticate} = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT || 3000

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
app.post("/", (req, res) => {

});

//Delete route
app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
   if (!ObjectID.isValid(id)) {
     return res.status(404).send()
   }
  Todo.findByIdAndRemove(id).then((todo) =>{
    if (!todo) {
      return res.status(404).send();
    }
    else {
      res.send({todo});
    }
  }).catch((e) => {
    res.status(404).send();
  })
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  //pick method allows you to specify specific items to the body. 
  //everything else will be removed.
  //it is a lodash method.
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
     return res.status(404).send()
   }

   if (_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
   } else {
     body.completed = false;
     body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {
     $set:body
   }, {
     new: true
   }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo});
   }).catch((e) => {
     res.status(400).send()
   });
});


// POST /users
app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);
 
  user.save().then(() =>{
    return user.generateAuthToken()
  }).then((token) => {
    res.header("x-auth", token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = {app};