const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "it's a wonderful idea!";
const User = require("./user");

router.get('/', (req, res, next)=>{
    res.render('dashboard.hbs', {user: req.user});
});

router.post("/signin", (req, res, next) => {
    User.findOne({ login: req.body.login}, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400
      });
      res.redirect('/');
    });
});

router.post("/signup", (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, 10);

  User.create({
    login: req.body.login,
    password : hash
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.redirect('/');
  });
});

router.get('/logout', function(req, res) {
  res.send({ auth: false, token: null });
  res.redirect('/');
});

module.exports = router;
