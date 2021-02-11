var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.send('index page');
});

router.get('/:article_number', (req, res)=>{
    res.send('article_number is ' + req.params.article_number);
});

module.exports = router;