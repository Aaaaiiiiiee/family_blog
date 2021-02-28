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
                        created_date        = article[0].created_date,
                        last_update_date    = article[0].last_update_date;

                    var html = template.index(`
                            <link rel="stylesheet" href="/css/article.css">
                            <script src="/javascript/article.js" type="text/javascript"></script>
                        `, `
                            <div id="article">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-8 title">${title}</div>
                                        <div class="col-6 col-md-4 writer">${writer}</div>
                                    </div>
                                </div>
                                ${img_html}
                            </div>
                        `);
                    res.send(html);
                }
            });
        });
    }
});

{/* <div id="article">
                            <div id="article_grid">
                                <h2>${article[0].title}</h2>
                                <h3>${article[0].writer}</h3>
                            </div>
                            <div class="slider">
                                ${img_html}
                            </div>
                            <p>
                                ${article[0].description}
                            </p>
                            <div id="article_grid">
                                <p>${article[0].created_date}</p>
                                <p>${article[0].last_update_date}</p>
                            </div>

                            <div class="controller">
                                <form method="GET" action="/upload/update">
                                    <input type="hidden" value="${req.params.article_number}" name="article_num">
                                    <input type="submit" value="update">
                                </form>
                                <form method="POST" action="/upload/delete">
                                    <input type="hidden" value="${req.params.article_number}" name="article_num">
                                    <input type="submit" value="delete">
                                </form>
                                <form method="GET" action="/board/" id="list">
                                    <input type="submit" value="list">
                                </form>
                            </div>
                        </div> */}

module.exports = router;