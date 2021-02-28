/* Personal Libraries */
var connectDB = require('../lib/secret.js');
var connection = connectDB.connectDB.connection;
var template = require('../lib/template.js');
var date = require('../lib/date.js');
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var head = `
        <link href="/css/login.css" rel="stylesheet" type="text/css">
        `;
    var body = `
        <body class="text-center">
            <main class="form-signin">
            <form action="/login/in" method="POST">
                <img class="mb-4" src="/images/logo.png" alt="" width="72" height="57">

                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                <label for="inputId" class="visually-hidden">id</label>
                <input type="id" id="inputId" class="form-control" placeholder="Your ID" required="" autofocus="" name="id">
                <label for="inputPassword" class="visually-hidden">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Your Password" required="" name="password">

                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

                <p class="mt-5 mb-3 text-muted">© 2021</p>
            </form>
            </main>
        </body>
    `;

    if (req.session.login_failed) {
        head += `<script src="/javascript/login.js"></script>`;
    }

    var html = template.basic(head, body);
    res.send(html);
});

router.post('/in', (req, res) => {
    var id = req.body.id;
    var pw = req.body.password;

    connection.query(`SELECT * FROM user WHERE id=?`, [id], (err, user) => {
        if (err) throw err;

        if(user.length === 0){
            /* Login Failed */
            console.log('login failed because of wrong id');
            req.session.login_failed = true;
            res.redirect('/login');
        } else if (pw == user[0].password) {
            /* Login Success */
            console.log('login succeed');

            req.session.login_failed = false;
            req.session.is_logined = true;
            req.session.user_realName = user[0].real_name;
            req.session.logged = date.now();
            req.session.maxAge = 1 * 60 * 15;   // 15 minutes

            connection.query(`INSERT INTO login_log(id, login_time) VALUES(?, NOW());`, [user[0].id], (err, data) => {
                if (err) throw err;
                console.log("INSERT login_log SUCCEED");
            });

            res.redirect('/index');
        } else {
            /* Login Failed */
            console.log('login failed');
            req.session.login_failed = true;
            res.redirect('/login');
        }
    });
});

router.get('/out', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

module.exports = router;