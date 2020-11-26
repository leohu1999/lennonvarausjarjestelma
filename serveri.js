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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    console.log("Etusivu ladattu!");

})

app.get('/public/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    console.log("Etusivu ladattu!");

})

app.get('/public/varaus.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/varaus.html'));
    console.log("Varaa lento ladattu!");

})

app.get('/public/omat.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/omat.html'));
    console.log("Omat varaukset ladattu!");

})

app.get('/public/akkilahdot.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
    console.log("Äkkilähdöt ladattu!");

})

app.get('/public/kohteet.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/kohteet.html'));
    console.log("Kaikki kohteet ladattu!");

})

app.get('/public/ohjeet.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/ohjeet.html'));
    console.log("Ohjeet ladattu!");

})

const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})