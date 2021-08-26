const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = "it's a wonderful idea!";
const User = require("./user");
const auth = require("./auth");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.get('/', (req, res, next)=>{
    res.render('dashboard.hbs');
     console.log(req.headers);
});

router.post("/signin", async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!(login && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ login });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, login },
        secret,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json(user);
      //res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
  console.log(req.headers);
});

router.post("/signup", async (req, res) => {
  var authorization = new Bearer(token.split(' ')[1]);
  try {
    const { login, password } = req.body;

    if (!(login && password)) {
      res.status(400).send("All input is required");
    }
    const existUser = await User.findOne({ login });

    if (existUser) {
      return res.status(409).send("User already exist. Please signin");
    }

    hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      login: login.toLowerCase(),
      password: hashedPassword
    });

    const token = jwt.sign(
      { user_id: user._id, login },
      secret,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    console.log(user);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.get("/protected", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post('./logout', function(req, res, next){
  req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            res.sendStatus(200);
        });
});

module.exports = router;
