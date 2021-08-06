const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

mongoClient.connect(function(err, client){

    const db = client.db("ncitylab");
    const collection = db.collection("users");
});


module.exports.getUser = function(email) {
  return new Promise((resolve, reject)=>{
    MongoClient
      .connect(url, function(err, client){
        if (err) {
          reject(err);
        }
        client
          .db("ncitylab")
          .collection('users')
          .find({ "email": email})
          .toArray(function(err, results){
            if (err) {
              reject(err)
            }
            client.close();
            resolve(results);
          })
    })
  })
}

module.exports.getToken = function(token) {
  return new Promise((resolve, reject)=>{
    MongoClient
      .connect(url, function(err, client){
        if (err) {
          reject(err);
        }
        client
          .db("ncitylab")
          .collection('token')
          .find({ "token": token})
          .toArray(function(err, results){
            if (err) {
              reject(err)
            }
            client.close();
            resolve(results);
      })
    })
  })
}

module.exports.add = function(tabl, data) {
  return new Promise((resolve, reject) => {
    MongoClient
      .connect(url, function(err, client) {
        if (err) {
          reject(err);
        }
        client
          .db("ncitylab")
          .collection(tabl)
          .insertOne(data, function(err, results){
            if (err) {
              reject(err);
            }
            client.close();
            resolve(results.ops[0]);
      })
    });
  })
}

module.exports.delete = function(email) {
  return new Promise((resolve, reject) => {
    //const id = new ObjectID(zadacaId);
    MongoClient
      .connect(url, function(err, client) {
        if (err) {
          reject(err);
        }
        client
          .db("ncitylab")
          .collection('token')
          .deleteMany({ "login": email},
            function(err, results){
              if (err) {
                reject(err);
              }
              client.close();
              resolve(results);
      })
    });
  })
}
