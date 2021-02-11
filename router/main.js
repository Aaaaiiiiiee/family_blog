var express = require('express');
var router = express.Router();

/* Personal variables */
var isLogged = false;

router.get('/', (req, res)=>{
   if(isLogged) res.redirect('/index');
   else res.redirect('/login');
});

module.exports = router;