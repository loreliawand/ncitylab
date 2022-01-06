const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const User = require('./schema');

router.get('/', (req, res, next)=>{
    res.render('dashboard.pug', { title: 'Dashboard' });
});

router.get('/timer', (req, res, next)=>{
    res.render('timer.pug', { title: 'Until the new Year' });
});

router.get('/form', (req, res, next)=>{
  let users = User.find({});
  res.render('form.pug', { title: 'User form' });
});

router.post('/form', (req, res)=>{
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


module.exports = router;
