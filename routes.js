var express = require('express');
var router = express.Router();

router.use('/', (req, res) => {
  res.render('dashboard.hbs');
});

module.exports = router;
