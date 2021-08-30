const express = require('express');
const app = express();
const jsonParser = express.json();
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const path = require('path');
const router = require('./routes');
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
const mongoose = require('mongoose');
const User = require("./user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const fetch = require('node-fetch');
const cors = require('cors');
//if (typeof localStorage === "undefined" || localStorage === null) {
  //var LocalStorage = require('node-localstorage').LocalStorage;
  //localStorage = new LocalStorage('./scratch');
//}

//localStorage.setItem('myFirstKey', 'myFirstValue');

const port = process.env.PORT || 3000;

const secret = "it's a wonderful idea!";

app.set("wiev engine", "hbs");

mongoClient.connect(function(err, client){

    const db = client.db("ncitylab");
    const collection = db.collection("users");
});

mongoose
 .connect("mongodb://localhost:27017/ncitylab", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Authorization', 'Bearer');
    next();
});
app.use('/', router);
app.use('/signup', router);
app.use('/signin', router);
app.use('/protected', router);

//app.use((req, res, next) => {
    //res.append('Access-Control-Allow-Headers', 'Content-Type');
    //res.append('Access-Control-Allow-Headers', 'Authorization');
    //next();
//});


app.use(session({
  secret: secret,
  cookie: {maxAge: 3600000},
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ncitylab' })
}));

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
