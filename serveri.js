const express = require('express');
const app = express();

const mysql = require('mysql');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const util = require('util');
var http = require('http')
const url = require('url');

const con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "flights"
});
const query = util.promisify(con.query).bind(con);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    console.log("Etusivu ladattu!");

})
app.get('/x', function(request,response){
    fetchData(response);
});
function executeQuery(sql , cb){
    con.query(sql, function (error, result, fields){
        if(error) {throw error}
        cb(result);
    })
}
function fetchData(response){
    executeQuery("SELECT destination_name, country FROM destination", function(result){
        console.log(result);
        var body = fs.readFileSync(__dirname + '/public/akkilahdot.html',"utf-8");
        response.writeHead(200,{"Content-Type" : "text/html"});
        response.write(body);
        response.write('<table id="lennot"><tr>');
        for(var column in result[0]){
            response.write('<td><label>' + column + '</label></td>');

        }
        response.write('</tr>')
        for(var row in result){
            response.write('<tr>');
            for (var column in result[row]){
                response.write('<td><label class="label">'+ result[row][column] +'</label></td>')
            }
            response.write('</tr>')
        }
        response.end('</table>')
    });
}

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
    fetchData(res);
    //res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
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