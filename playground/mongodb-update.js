const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db) => {
  if(err) {
    return console.log(`Unable to connect to MongoDB server ${err}`);
  }
  console.log(`Connected to Mongodb server`);
  
  //findOneAndUpdate
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("59827d6b4a4de9f018277166")
  },{
    $set: {
      name: "Charlie 'Alexander the Great' Chaaban"
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

 
  //db.close();
});