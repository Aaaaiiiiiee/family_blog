/* Personal Libraries */
var template = require('../lib/template.js');
/* npm module */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/album/'});

router.get('/', (req, res)=>{
    if(!req.session.is_logined) res.redirect('/login');
    else{
        var html = template.header('');
        html += `
            <form action="/upload/stats" enctype="multipart/form-data" method="post">
                <div class="form-group">
                    <input type="file" name="uploaded_file">
                    <input type="text" placeholder="Number of speakers" name="nspeakers">
                    <input type="submit" value="Get me the stats!">            
                </div>
            </form>
        `;
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

module.exports = router;