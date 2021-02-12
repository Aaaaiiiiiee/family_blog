/* Personal Libraries */
var connectDB = require('../lib/secret.js');
var connection = connectDB.connectDB.connection;
var template = require('../lib/template.js');
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var head = `
        <link rel="stylesheet" type="text/css" href="/css/login.css">
        `;
    var body = `
        <form id="grid" action="/login/processing" method="POST">
            <div>
                <input type="text" placeholder="id" name="id">
                <input type="password" placeholder="pw" name="password">
            </div>
            <input id="login_button" type="submit" value="login">
        </form>
    `;

    if(req.session.login_failed){
        head += `<script src="/javascript/login.js"></script>`;
    }

    var html = template.HTML(head, body);
    res.send(html);
});

router.post('/processing', (req, res) => {
    var id = req.body.id;
    var pw = req.body.password;

    connection.query(`SELECT * FROM user WHERE id=?`, [id], (err, user) => {
        if (err) throw err;

        if (pw == user[0].password) {
            /* Login Success */
            console.log('login succeed');
            req.session.is_logined = true;
            res.redirect('/index');
        } else {
            /* Login Failed */
            console.log('login failed');
            req.session.login_failed = true;
            res.redirect('/login');
        }
    });
});

module.exports = router;