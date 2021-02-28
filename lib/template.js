var template = {
    makeImgtagFromAlbumPhotos: function (data) {
        var ret = `
            <div class="slidercontainer">
        `;
        for (var i = 0; i < data.length; i++) {
            var str = `
                <div class="showSlide fade">
                    <img src="/album/${data[i].filename}">
                </div>
            `;
            ret += str;
        }
        ret += `
            <!-- Navigation arrows -->
            <a class="left" onclick="nextSlide(-1)"><</a>
            <a class="right" onclick="nextSlide(1)">></a>
        `;
        return ret;
    },

    makeTable: function (columns, data) {
        var ret = "<table><thead><tr>";
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].Field == 'description' || columns[i].Field == 'last_update_date') continue;
            ret += "<th>" + columns[i].Field + "</th>";
        }
        ret += "</tr></thead>";


        ret += "<tbody>";
        for (var i = 0; i < data.length; i++) {
            ret += "<tr>";

            for (var j = 0; j < columns.length; j++) {
                if (columns[j].Field == 'description' || columns[j].Field == 'last_update_date') continue;

                ret += "<td>";
                if (columns[j].Field == 'title') {
                    ret += "<a href='/article/" + data[i].number + "'>";
                } else if (columns[j].Field == 'created_date') {
                    ret += `${data[0].created_date.toLocaleString('ko-KR', { timeZone: 'UTC' })}` + '</td>';
                    continue;
                }
                ret += data[i][columns[j].Field];
                if (columns[j].Field == 'title') {
                    ret += '</a>';
                }


                ret += "</td>";
            }

            ret += "</tr>"
        }
        ret += "</tbody>"

        return ret;
    },

    basic: function (head, body) {
        return `
            <!DOCTYPE HTML>
            <html lang="ko" class="h-100">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">

                    <!-- Bootstrap CSS -->
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

                    <title>Family Blog</title>

                    ${head}
                </head>
                <body>
                    ${body}

                    <!-- Option 1: Bootstrap Bundle with Popper -->
                    <script src="/javascript/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
                </body>
            </html>
        `;
    },

    index: function (head, main){
        return this.basic(`
            <link href="/css/index.css" rel="stylesheet">
            <script type="text/javascript" src="/javascript/index.js"></script>

            ${head}
        `, `
            <body class="d-flex h-100 text-center text-white bg-dark">
                <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header class="mb-auto">
                        <div>
                        <h3 class="float-md-start mb-0">Family Blog</h3>
                        <nav class="nav nav-masthead justify-content-center float-md-end">
                            <a class="nav-link" href="/index">Home</a>
                            <a class="nav-link" href="/upload">Upload</a>
                            <a class="nav-link" href="/timeline">Timeline</a>
                            <a class="nav-link" href="/board">Board</a>
                            <a class="nav-link" href="/about">About</a>
                            <a class="nav-link" id="logout" href="/login/out">logout</a>
                        </nav>
                        </div>
                    </header>

                    <main class="px-3">
                        ${main}
                    </main>

                    <footer class="mt-auto text-white-50">
                        <p>ⓒ 2021</p>
                    </footer>
                </div>
            </body>
        `);
    }
};

module.exports = template;