/* Personal Libraries */
var template = require('../lib/template.js');
var connectDB = require('../lib/secret.js');
var connection = connectDB.connectDB.connection;
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.is_logined) res.redirect('/login');
    else {
        res.redirect('/board/1');
    }
});

router.get('/:tableNum', (req, res) => {
    if (!req.session.is_logined) res.redirect('/login');
    else {
        var tableNum = req.params.tableNum - 1;
        connection.query(`SELECT * FROM article LIMIT ?,10;`, [tableNum], (err, article_data) => {
            if (err) throw err;

            connection.query(`SHOW COLUMNS FROM article;`, (err, article_columns) => {
                if (err) throw err;

                var table = template.makeTable(article_columns, article_data);
                var html = template.header(`
                <link rel="stylesheet" type="text/css" href="/css/board.css">
            `, `
                ${table}
            `);
                res.send(html);
            });
        });
    }
});

module.exports = router;