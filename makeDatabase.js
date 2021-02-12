var createDB = require('./lib/secret');
var con = createDB.db.con;

con.connect(function (err) {
    if (err) throw err;
    console.log('connected');

    /* CREATE DATABASE blog */
    con.query('CREATE DATABASE blog;', (error, res) => {
        if (error) throw error;
        console.log('DATABASE blog CREATED');
    });
    con.query('USE blog;');

    /* CREATE TABLE user */
    con.query(`CREATE TABLE user(
        id              VARCHAR(20) NOT NULL,
        password        VARCHAR(20) NOT NULL,
        real_name       VARCHAR(10),
        profile_image   VARCHAR(40),
        age             INT(11),
        birth           DATE,
        PRIMARY KEY(id)
    );`, (error, result) => {
        if (error) throw error;
        console.log('TABLE user CREATED');
    });

    /* CREATE TABLE article */
    con.query(`CREATE TABLE article(
        number              INT(11)     NOT NULL,
        title               VARCHAR(20) NOT NULL,
        description         TEXT,
        created_date        DATETIME    NOT NULL,
        last_update_date    DATETIME    NOT NULL,
        PRIMARY KEY(number)
    );`, (err, res) => {
        if (err) throw err;
        console.log('TABLE article CREATED');
    });

    /* CREATE TABLE comment */
    con.query(`CREATE TABLE comment(
        user_id         VARCHAR(20) NOT NULL,
        comment         TEXT        NOT NULL,
        created_date    DATETIME    NOT NULL,
        article_num     INT(11)     NOT NULL,
        PRIMARY KEY(article_num)
    );`, (err, res) => {
        if (err) throw err;
        console.log('TABLE comment CREATED');
    });

    con.end();
});