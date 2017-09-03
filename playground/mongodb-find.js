const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server ${err}`);
  }
  console.log(`Connected to Mongodb server`);

  db.collection('Todos').find({
    name: new ObjectID("59ac3c0ffa6f3ec04e0e9d2b")
  }).toArray().then((docs) => {
    console.log("Todos");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch todos", err);
  });


  //   db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log("Unable to fetch todos", err);
  // });

  //db.close();
});