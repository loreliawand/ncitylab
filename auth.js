const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
const mongoose = require('mongoose');
const User = require("./user");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    token = authHeader(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }
      console.log(authHeader);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
    //console.log(req);
    //console.log(res);
  }
};

module.exports = authenticateMiddleware;
