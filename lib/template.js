var template = {
    HTML: function (head, body) {
        return `
            <!DOCTYPE HTML>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Family Blog</title>
                    ${head}
                </head>
            <body>
                ${body}
            </body>
            </html>
        `;
    }
};

module.exports = template;