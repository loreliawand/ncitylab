const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const path = require('path');
const router = require('./routes');
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

const port = process.env.PORT || 3000;

mongoClient.connect(function(err, client){

    if(err){
        return console.log(err);
    }
    // взаимодействие с базой данных
    client.close();
});

app.set("wiev engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.use(function(req, res, next) {
  const err = new Error("Sorry, I didn't find anything");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
});

app.listen(port, () => {
  console.log('Express web app available at localhost: 3000')
});
