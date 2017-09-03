const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server ${err}`);
  }
  console.log(`Connected to Mongodb server`);

  // db.collection("Todos").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(`Unable to insert todo `, err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  //Insert new do into Users (name, age, location)

  // db.collection("Users").insertOne({
  //   name: "Majed Chaaban",
  //   age: 27,
  //   location: "Baltimore, MD"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(`Unable to insert user `, err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // })

  db.close();
});