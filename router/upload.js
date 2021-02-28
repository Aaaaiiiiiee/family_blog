/* default libraries */
var path = require('path');
var url = require('url');
/* Personal Libraries */
var template = require('../lib/template.js');
var connectDB = require('../lib/secret.js');
var connection = connectDB.connectDB.connection;
/* npm module */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({  // multer disk storage settings
    destination: function (req, file, callback) {
        callback(null, './public/album')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({ // `upload` multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('only images are allowed'))
        } else if (file.originalname.length > 50) {
            return callback(new Error("filename can't be more than 50"));
        } else if (req.body.title > 100) {
            return callback(new Error("title can't be more than 100"));
        }
        callback(null, true)
    },
}).array('album_photos', 10);

router.get('/', (req, res) => {
    if (!req.session.is_logined) res.redirect('/login');
    else {
        var html = template.index(`
            <!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src-elem 'self'">-->
            <link rel="stylesheet" type="text/css" href="/css/upload.css">
            <script type="text/javascript" src="/javascript/upload.js"></script>
        `, `
            <form action="/upload/article" enctype="multipart/form-data" method="post">
                <div class="input-group mb-3">
                    <input type="file" name="album_photos" multiple >
                </div>
                <div class="input-group mb-3">
                    <input type="text" name="title" placeholder="title" id="title">
                </div>
                <div class="input-group mb-3">
                    <textarea name="article_body" placeholder="description"></textarea>
                </div>
                <input type="submit" value="Upload" class="btn btn-outline-secondary my_submit_btn">
            </form>
        `);
        res.send(html);
    }
});

router.post('/article', upload, (req, res, next) => {
    connection.query(`INSERT INTO article(title, description, writer, created_date, last_update_date)
        VALUES (?, ?, ?, NOW(), NOW());
    `, [req.body.title, req.body.article_body, req.session.user_realName], (err, article_data)=>{
        if(err) throw err;
        console.log('TABLE article IS NOW ADDED!!!');

        for(var i=0; i<req.files.length; i++){
            var filename = req.files[i].filename;
            connection.query(`INSERT INTO album_photo(filename, article_id) VALUES(?, ?);`, [filename, article_data.insertId], (err, album_photo_data)=>{
                if(err) throw err;
                console.log('FILE IS ADDED IN TABLE album_photo');
            });
        }

        res.redirect('/article/' + article_data.insertId);
    });
});

router.get('/update', (req, res)=>{
    if (!req.session.is_logined) res.redirect('/login');
    else {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        connection.query(`SELECT * FROM article WHERE number=?;`, [query.article_num], (err, article_data)=>{
            var html = template.index(`
                <!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src-elem 'self'">-->
                <link rel="stylesheet" type="text/css" href="/css/upload.css">
                <script type="text/javascript" src="/javascript/upload.js"></script>
            `, `
                <form action="/upload/update/process" enctype="multipart/form-data" method="post">
                    <input type="hidden" name="article_num" value="${query.article_num}">
                    <input type="file" class="form_control_file" name="album_photos" multiple>
                    <input type="text" name="title" placeholder="title" class="type" id="title" value="${article_data[0].title}">
                    <textarea name="article_body" placeholder="description" class="type">${article_data[0].description}</textarea>
                    <input type="submit" value="Upload" class="submit-btn btn">
                </form>
            `);
            res.send(html);
        });
    }

});

router.post('/update/process', upload, (req, res, next)=>{
    connection.query(`UPDATE article SET title=?, description=? WHERE number=?`, [req.body.title, req.body.article_body, req.body.article_num], (err, data)=>{
        console.log('TABLE article UPDATED!!!');
        res.redirect('/article/' + req.body.article_num);
    });
});

router.post('/delete', (req, res)=>{
    connection.query(`DELETE FROM article WHERE number=?;`, [req.body.article_num], (err, data)=>{
        console.log('article is DELETED!!!');
        connection.query(`DELETE FROM album_photo WHERE article_id=?;`, [req.body.article_num], (err, data)=>{
            console.log('photos are DELETED!!!');
            res.redirect('/board/');
        });
    });
});

module.exports = router;