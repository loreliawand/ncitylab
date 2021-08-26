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
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
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

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/protected", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post('./logout', function(req, res, next){
  if (req.session.user) {
    delete req.session.user;
    res.redirect('/')
  }
})

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = router;
