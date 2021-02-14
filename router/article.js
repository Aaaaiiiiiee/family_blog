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

                var img_html = template.makeImgtagFromAlbumPhotos(album_photos);

                var html = template.header(`
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src-elem 'self'; img-src 'self'">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Times+New+Roman">
                    <link rel="stylesheet" type="text/css" href="/css/article.css">
                    <script type="text/javascript" src="/javascript/jquery.min.js"></script>
                    <script type="text/javascript" src="/javascript/article.js"></script>
                    `, `
                    <div id="article">
                        <h2>${article[0].title}</h2>
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

                        <!--<form action="/blog" method="GET">
                            <input type="submit" value="list" name="list">
                        </form>-->
                    </div>
                    `);
                res.send(html);
            });
        });
    }
});

module.exports = router;