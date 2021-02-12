/* Personal Libraries */
var template = require('../lib/template.js');
/* npm module */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/album')
    },
    filename: function(req, file, callback){
        callback(null, file.filename + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

router.get('/', (req, res)=>{
    if(!req.session.is_logined) res.redirect('/login');
    else{
        var html = template.header(``, `
            <form action="/upload/multiple-upload" enctype="multipart/form-data" method="post">
                <div class="form-group">
                    <input type="file" class="form-control-file" name="uploaded_file_1" multiple>
                    <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers">
                    <input type="submit" value="Get me the stats!" class="btn">
                </div>
            </form>
        `);
        res.send(html);
    }
});

router.post('/stats', upload.single('uploaded_file'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file);
   console.log("and");
   console.log(req.body);
});

router.post('/multiple-upload', upload.array('photos', 10), (req, res, next)=>{});

module.exports = router;