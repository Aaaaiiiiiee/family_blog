/* Personal Libraries */
var template = require('../lib/template.js');
var connectDB = require('../lib/secret.js');
var connection = connectDB.connectDB.connection;
/* npm module */
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.is_logined) res.redirect('/login');
    else {
        var html = template.header('', '');
        html += 'this is article';
        res.send(html);
    }
});

router.get('/:article_number', (req, res) => {
    if (!req.session.is_logined) res.redirect('/login');
    else {
        /* query to article */
        connection.query(`SELECT * FROM article WHERE number=?;`, [req.params.article_number], (err, article) => {
            if (err) throw err;

            /* query to album_photo */
            connection.query(`SELECT * FROM album_photo WHERE article_id=? ORDER BY id ASC`, [req.params.article_number], (err, album_photos) => {
                if (err) throw err;

                if(album_photos.length === 0){
                    console.log("There was a request to undefined router");
                    res.status(404).send('Wrong Access!!(404)');
                } else {
                    var img_html            = template.makeImgtagFromAlbumPhotos(album_photos);
                    let title               = article[0].title,
                        writer              = article[0].writer,
                        desc                = article[0].description,
                        created_date        = article[0].created_date.toLocaleString('ko-KR', { timeZone: 'UTC' }),
                        last_update_date    = article[0].last_update_date.toLocaleString('ko-KR', { timeZone: 'UTC' });

                    var html = template.index(`
                            <link rel="stylesheet" href="/css/article.css">
                            <script src="/javascript/article.js" type="text/javascript"></script>
                        `, `
                            <div id="article">
                                <div class="container">
                                    <div class="row">
                                        <div class="col title"><h2>${title}</h2></div>
                                        <div class="col writer"><h4>${writer}</h4></div>
                                    </div>
                                </div>
                                ${img_html}
                                <p>${desc}</p>
                                <div class="container date">
                                    <div class="row">
                                        <div class="col-4 date_name">만든 날짜</div>
                                        <div class="col-8 date_value">${created_date}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-4 date_name">최근 수정</div>
                                        <div class="col-8 date_value">${last_update_date}</div>
                                    </div>
                                </div>
                                <div class="container controller">
                                    <div class="row">
                                        <div class="col-8">
                                            <form action="/upload/update" method="GET">
                                                <input type="hidden" value="${req.params.article_number}" name="article_num">
                                                <button type="submit" class="btn btn-outline-secondary">Update</button>
                                            </form>
                                            <form action="/upload/delete" method="POST">
                                                <input type="hidden" value="${req.params.article_number}" name="article_num">
                                                <button type="submit" class="btn btn-outline-secondary">Delete</button>
                                            </form>
                                        </div>
                                        <div class="col-4 list_btn">
                                            <a href="/board" class="btn btn-outline-secondary">List</a>
                                        </div>
                                    </div>
                                </div>
                        `);
                    res.send(html);
                }
            });
        });
    }
});

module.exports = router;