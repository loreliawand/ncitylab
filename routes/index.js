const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

let auth = function(req, res, next) {
  db
    .getToken(req.headers.authorization)
    .then((results)=>{
      if (results.length == 0) {
        const err = new Error('Not authorized');
        err.status = 401;
        next(err);
      } else {
        next()
      }
    })
    .catch((err)=>{
      next(err);
    })
}

const isValidPassword = function(user, password) {
  return bcrypt.compareSync(password, user.password);
}

router.get('/', (req, res)=>{
  res.json({
    message: 'Welcome!'
  })
});

router.get('/secret', auth, (req, res)=>{
  res.json({
    message: 'Secret page'
  })
});

router.post('/registration', (req, res, next)=>{
  if(req.body.password === req.body.repeatPassword){
    db
      .getUser(req.body.email)
      .then((results)=>{
        if (results.length == 0){
          data = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          };
          db
            .add('users', data)
            .then((results)=>{
              res.json({
                message: 'Added a new user: ' + results[0]
              })
            })
            .catch((err)=>{
              next(err);
            })
        } else {
          const err = new Error('This user already exists!');
          err.status = 400;
            next(err);
        }
      })
      .catch((err)=>{
        next(err);
      })
  } else {
    const err = new Error('Password and password confirmation do not match!');
    err.status = 400;
      next(err);
  }
})

router.post('/login', (req, res, next)=>{
  db
    .getUser(req.body.email)
    .then((results)=>{
      if (isValidPassword(results[0], req.body.password)) {
        data ={};
        data.login=req.body.email;
        data.token=uuidv4();
        db
          .delete(req.body.email)
          .then((results)=>{
            db
              .add('token', data)
              .then((results)=>{
                res.json({
                  token: results.token
                })
              })
              .catch((err)=>{
                next(err)
              })
          })
          .catch((err)=>{
            next(err)
          })
      } else {
        const err = new Error('Invalid login or password!');
        err.status = 400;
        next(err);
      }
    })
    .catch((err)=>{
      next(err);
    })
})

module.exports = router;
