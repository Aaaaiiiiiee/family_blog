var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    req.session.login_failed = false;
    
    if (req.session.is_logined) res.redirect('/index');
    else res.redirect('/login');
});

module.exports = router;