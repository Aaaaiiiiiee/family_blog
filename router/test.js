var template = require('../lib/template');
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var html = template.index('', '');
    res.send(html);

});

module.exports = router;