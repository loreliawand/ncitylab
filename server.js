const express = require('express');
const app = express();
const jsonParser = express.json();
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');
const router = require('./routes');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

app.set("wiev engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', router);
app.use('/timer', router);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/ncitylab');
}


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
