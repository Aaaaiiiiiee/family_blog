var template = {
    HTML: function (head, body) {
        return `
            <!DOCTYPE HTML>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Family Blog</title>
                    <link rel="stylesheet" type="text/css" href="/css/default.css">
                    ${head}
                </head>
            <body>
                ${body}
            </body>
            </html>
        `;
    },

    header: function(head, content){
        return this.HTML(`
            <link rel="stylesheet" type="text/css" href="/css/index.css">
            ${head}
        `, `
            <div id="header">
                <div id="header-grid">
                    <div id="header-information">
                        <span>
                            <h1>Family Blog</h1>
                            <a href="/login/out">logout</a>
                            <a href="/upload">upload</a>
                        </span>
                    </div>
                    <nav>
                        <span id="navigation">
                            <li><a href="/index">Home</a></li>
                            <li><a href="/timeline">Timeline</a></li>
                            <li><a href="/board">Board</a></li>
                            <li><a href="/about">About</a></li>
                        </span>
                    </nav>
                </div>
            </div>
            ${content}
        `);
    },

    makeImgtagFromAlbumPhotos: function(data){
        var ret = '';
        for(var i=0; i<data.length; i++){
            var str = `<img src="/album/`;
            str += `${data[i].filename}">`;

            ret += str;
        }
        return ret;
    }
};

module.exports = template;