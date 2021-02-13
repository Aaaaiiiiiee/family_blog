// You should change this value, before running on main app. (-> 30)
const port = 3000;
/* Personal Libraries */
var secret = require('./lib/secret.js');

/* default module */
const express = require('express');
const app = express();
/* npm module */
const helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
var bodyParser = require('body-parser');

/* default middleware */
app.use('/', express.static(__dirname + '/public'));
/* npm middleware */
app.use(helmet());
app.use(session({
    secret: secret.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

/* personal router */
var mainRouter      = require('./router/main');
var loginRouter     = require('./router/login');
var indexRouter     = require('./router/index');
var timelineRouter  = require('./router/timeline');
var boardRouter     = require('./router/board');
var aboutRouter     = require('./router/about');
var uploadRouter    = require('./router/upload');
var articleRouter   = require('./router/article');

/* Add Router */
app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/', mainRouter);
app.use('/timeline', timelineRouter);
app.use('/board', boardRouter);
app.use('/about', aboutRouter);
app.use('/upload', uploadRouter);
app.use('/article', articleRouter);

/* Page not Found (404) */
app.use((req, res, next)=>{
    res.status(404).send('Wrong Access!!(404)');
});

/*** Error Middleware ***/
app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});