const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const path = require('path');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/dashboard.html'));
});

app.listen(port, () => {
  console.log('Express web app available at localhost: ${port}')
});
