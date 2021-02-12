/* Personal Libraries */
var template = require('../lib/template.js');
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    template.HTML(`
        <link rel="stylesheet" type="text/css" href="index.css">
    `, `
        <div id="header">
            <div id="header-grid">
                <div id="header-information">
                    <span>
                        <h1>Family Blog</h1>
                        <a>login/out</a>
                    </span>
                </div>
                <nav>
                    <span id="navigation">
                        <li><a href="/index">Home</a></li>
                        <li><a href="/timeline">Timeline</a></li>
                        <li><a href="/article">Article</a></li>
                        <li><a href="/about">About</a></li>
                    </span>
                </nav>
            </div>
        </div>
    `);
});

router.get('/:article_number', (req, res)=>{
    res.send('article_number is ' + req.params.article_number);
});

module.exports = router;