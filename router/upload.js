/* default libraries */
var path = require('path');
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
        var html = template.header(`
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src-elem 'self'">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Times+New+Roman">
            <link rel="stylesheet" type="text/css" href="/css/upload.css">
            <script type="text/javascript" src="/javascript/jquery.min.js"></script>
            <script type="text/javascript" src="/javascript/upload.js"></script>
        `, `
            <form action="/upload/article" enctype="multipart/form-data" method="post">
                <input type="file" class="form_control_file" name="album_photos" multiple>
                <input type="text" name="title" placeholder="title" class="type" id="title">
                <textarea name="article_body" placeholder="description" class="type"></textarea>
                <input type="submit" value="Upload" class="submit-btn btn">
            </form>
        `);
        res.send(html);
    }
});

router.post('/article', upload, (req, res, next) => {
    console.log(req.files);
    connection.query(`INSERT INTO article(title, description, created_date, last_update_date)
        VALUES (?, ?, NOW(), NOW());
    `, [req.body.title, req.body.article_body], (err, article_data)=>{
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

module.exports = router;