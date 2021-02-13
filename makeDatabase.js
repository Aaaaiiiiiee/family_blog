var createDB = require('./lib/secret');
var con = createDB.createDB.con;

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
        number                      INT(11)     NOT NULL    AUTO_INCREMENT,
        title                       VARCHAR(100) NOT NULL,
        description                 TEXT,
        album_photo_start_id        INT(11),
        number_of_picture           INT(11),
        created_date                DATETIME    NOT NULL,
        last_update_date            DATETIME    NOT NULL,
        PRIMARY KEY(number)
    );`, (err, res) => {
        if (err) throw err;
        console.log('TABLE article CREATED');
    });

    /* CREATE TABLE album_photo*/
    con.query(`CREATE TABLE album_photo(
        id          INT(11)     NOT NULL    AUTO_INCREMENT,
        filename    VARCHAR(113) NOT NULL,
        PRIMARY KEY(id)
    );`, (err, res)=>{
        if(err) throw err;
        console.log('TABLE album_photo CREATED');
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

    /* CREATE TABLE login_log */
    con.query(`CREATE TABLE login_log(
        id              VARCHAR(20) NOT NULL,
        login_time      DATETIME    NOT NULL
    );`, (err, res) => {
        if (err) throw err;
        console.log('TABLE login_log CREATED');
    });

    con.end();
});