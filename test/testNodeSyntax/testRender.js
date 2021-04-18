/*** Author Info
 * github: Aaaaiiiiiee
 * acm: wonjunpark@acm.org */
'use strict';

const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/sendFile', (req, res) => {
    res.sendFile(__dirname + '/testRender.html');
});

app.get('/render', (req, res) => {
    res.render(__dirname + '/testRender.html', {name: 'Tobi'}, (err, html) => {
        console.log('err: ', err);
        console.log('html: ', html);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
