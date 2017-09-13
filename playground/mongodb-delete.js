const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server ${err}`);
  }
  console.log(`Connected to Mongodb server`);
  

  // deleteMany
  db.collection('Users').deleteMany({
    name: "Majed Chaaban"
  }).then((result) => {
    console.log(result, "-----------------------");
  });
  // deleteOne
  //   db.collection('Todos').deleteOne({
  //   text: "Something to do"
  // }).then((result) => {
  //   console.log(result, "****************");
  // });

  //findOneAndDelete
   db.collection('Users').findOneAndDelete({
    _id: new ObjectID("59aaf7a4277ad529018381f1")
  }).then((result) => {
    console.log(result);
  });
  //db.close();
});