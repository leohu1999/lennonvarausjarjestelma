const express = require('express');
const app = express();

const mysql = require('mysql');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

const util = require('util');
var http = require('http')
const url = require('url');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

var body = fs.readFileSync(__dirname + '/public/akkilahdot.html', "utf-8")
var d = new Date();
var hour = d.getUTCHours() +2;
var minute = d.getUTCMinutes();
var month = d.getMonth() +1

app.post('/public/akkilahdot.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>Time</label></td>');
    response.write('<td><label>Destination</label></td>');
    response.write('<td><label>Country</label></td>');

    response.write('</tr>');

    let sql = "SELECT time, destination_destination_id FROM schedule WHERE date = '" + d.getFullYear() + "-" + month + "-" +d.getUTCDate()+ "' AND time >= '" +req.body.Startdate+ "' AND time <= '" + req.body.Enddate + "';";
    console.log(sql);
    (async () => {
        try {

            let sql1 = [];
            let kohteet = [];
            let maat = [];
            const rows = await query(sql);
            //let sql1 = "SELECT * FROM event WHERE " +rows +";";
            //const rows1 = await query(sql1)
            let string = JSON.stringify(rows);
            let alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                sql1.push("SELECT * FROM destination WHERE destination_id='" + row.destination_destination_id + "';");

            });

            for (var i = 0; i < sql1.length; i++) {
                const rows2 = await query(sql1[i]);
                Object.keys(rows2).forEach(function (key) {
                    var row = rows2[key];
                    kohteet.push(row.destination_name);
                    maat.push(row.country)
                });
            }
            ;
            for (var i = 0; i < rows.length; i++) {
                response.write('<tr>');
                response.write('<td><label class="label">' + rows[i].time + '</label></td>');
                response.write('<td><label class="label">' + kohteet[i]+ '</label></td>');
                response.write('<td><label class="label">' + maat[i]+ '</label></td>');
                response.write('</tr>');
            }
            response.end('</table>')
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
    //res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
    console.log("Äkkilähdöt ladattu!");

});

app.get('/public/akkilahdot.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>Time</label></td>');
    response.write('<td><label>Destination</label></td>');
    response.write('<td><label>Country</label></td>');

    response.write('</tr>');

    let sql = "SELECT time, destination_destination_id FROM schedule WHERE  date = '" + d.getFullYear() + "-" + month + "-" +d.getUTCDate()+ "' AND time >= '" + hour + ":" + minute+ "';";
    (async () => {
        try {

            let sql1 = [];
            let kohteet = [];
            let maat = [];
            const rows = await query(sql);
            //let sql1 = "SELECT * FROM event WHERE " +rows +";";
            //const rows1 = await query(sql1)
            let string = JSON.stringify(rows);
            let alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                sql1.push("SELECT * FROM destination WHERE destination_id='" + row.destination_destination_id + "';");

            });

            for (var i = 0; i < sql1.length; i++) {
                const rows2 = await query(sql1[i]);
                Object.keys(rows2).forEach(function (key) {
                    var row = rows2[key];
                    kohteet.push(row.destination_name);
                    maat.push(row.country)
                });
            }
;
            for (var i = 0; i < rows.length; i++) {
                response.write('<tr>');
                response.write('<td><label class="label">' + rows[i].time + '</label></td>');
                response.write('<td><label class="label">' + kohteet[i]+ '</label></td>');
                response.write('<td><label class="label">' + maat[i]+ '</label></td>');
                response.write('</tr>');
            }
            response.end('</table>')
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
    //res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
    console.log("Äkkilähdöt ladattu!");

});

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