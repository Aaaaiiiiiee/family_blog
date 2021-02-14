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
            <script type="text/javascript" src="/javascript/jquery.min.js"></script>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Times+New+Roman">
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
    },

    makeTable: function(columns, data){
        var ret = "<table><thead><tr>";
        for(var i=0; i<columns.length; i++){
            if(columns[i].Field == 'description' || columns[i].Field == 'last_update_date') continue;
            ret += "<th>" + columns[i].Field + "</th>";
        }
        ret += "</tr></thead>";


        ret += "<tbody>";
        for(var i=0; i<data.length; i++){
            ret += "<tr>";

            for(var j=0; j<columns.length; j++){
                if(columns[j].Field == 'description' || columns[j].Field == 'last_update_date') continue;

                ret += "<td>";
                if(columns[j].Field == 'title'){
                    ret += "<a href='/article/" + data[i].number + "'>";
                } else if(columns[j].Field == 'created_date'){
                    ret += `${ data[0].created_date.toLocaleString('ko-KR', {timeZone: 'UTC'})}` + '</td>';
                    continue;
                }
                ret += data[i][columns[j].Field];
                if(columns[j].Field == 'title'){
                    ret += '</a>';
                }
                
                
                ret += "</td>";
            }

            ret += "</tr>"
        }
        ret += "</tbody>"

        return ret;
    }
};

module.exports = template;