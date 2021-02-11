// You should change this value, before running on main app. (-> 30)
const port = 3000;
/* Personal Libraries */
var secret = require('./nodejs/secret.js');

/* default module */
const express = require('express');
const app = express();
/* npm module */
const helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session)

/* default middleware */
app.use(express.static('public'));
/* npm middleware */
app.use(helmet());
app.use(session({
    secret: secret.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

/* personal router */
var mainRouter = require('./router/main');
var loginRouter = require('./router/login');
var indexRouter = require('./router/index');

/* Add Router */
app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/', mainRouter);

/* Page not Found (404) */
app.use((req, res, next)=>{
    res.status(404).send('Wrong Access!!(404)');
});

/* 
*** Error Middleware ***
*   Error가 발생했을 때, handling이 가능하다.*/
app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});