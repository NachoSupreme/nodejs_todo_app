const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user")

//var id = "59c01ab83b1afaf378134bfa";
var userId = "59ba9c3843be83f11f8b1d42"

// if (!ObjectID.isValid(id)) {
//   console.log("Id is not valid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos,", todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo,", todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("Cannot find Id")
//   }
//   console.log("Todo by Id, ", todo)
// }).catch((e) => {console.log(e)});

User.findById(userId).then((user) => {
  if (!user) {
    return console.log("User not found");
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log("Error: ", e);
});