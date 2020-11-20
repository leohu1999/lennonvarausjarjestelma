const express = require('express');
const app = express();

const mysql = require('mysql');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const util = require('util');

const url = require('url');

const con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "example_db"
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    console.log("Homepage loaded!");
    res.send('Hello GET');

})

const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});