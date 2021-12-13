const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('dashboard.pug', { title: 'Dashboard' });
});

router.get('/timer', (req, res, next)=>{
    res.render('timer.pug', { title: 'Until the new Year' });
});


module.exports = router;
