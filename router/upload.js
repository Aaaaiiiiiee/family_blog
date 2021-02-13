/* default libraries */
var path = require('path');
/* Personal Libraries */
var template = require('../lib/template.js');
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
var upload = multer({ // multer settings
    storage: storage,
    fileFilter: function(req,file, callback){
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg'){
            return callback(new Error('only images are allowed'))
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
                <textarea name="article_body"></textarea>
                <input type="submit" value="Upload" class="submit-btn btn">
            </form>
        `);
        res.send(html);
    }
});

// router.post('/stats', upload.single('uploaded_file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file);
//     console.log("and");
//     console.log(req.body);
// });

// router.post('/multiple-upload', upload.array('uploaded_files', 10), (req, res, next) => {
//     console.log(req.files);
//     res.send('your file is uploaded');
// });

router.post('/article', upload, (req,res,next)=>{
    console.log(req.files);
    console.log('and');
    console.log(req.body);
    res.redirect('/article/'+'1');
});

module.exports = router;