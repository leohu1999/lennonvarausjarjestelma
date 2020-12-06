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

var omat = fs.readFileSync(__dirname + '/public/omat.html', "utf-8");
var muokkaus = fs.readFileSync(__dirname + '/public/muokkaus.html', "utf-8");

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

});
app.get('/public/muokkaus.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(muokkaus);
    response.end();
});
app.post('/public/muokkaus.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(muokkaus);
    let sql = "UPDATE reservations SET seats='" + req.body.varausPaikat + "' WHERE reservation_id='"+ req.body.id +"';";
    (async () => {
        try {
            const rows = await query(sql);
            console.log(rows);
            response.write('<p id="vahvistustekstit">Varauksen muokkaus onnistui!</p>');
            response.end();
        }
        catch (err) {
            console.log("Database error!"+ err);
            response.write('<p id="vahvistustekstiterror">Varauksen muokkaus epäonnistui!</p>');
        }
    })()
    console.log("Varaus muokattu!");
});
app.post('/public/poisto', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(muokkaus);
    let sql = "DELETE FROM reservations WHERE reservation_id='"+ req.body.id +"';";
    (async () => {
        try {
            const rows = await query(sql);
            console.log(rows);
            response.write('<p id="vahvistustekstit">Varauksen poisto onnistui!</p>');
            response.end();
        }
        catch (err) {
            console.log("Database error!"+ err);
            response.write('<p id="vahvistustekstiterror">Varauksen poisto epäonnistui!</p>');
        }
    })()
    console.log("Varaus poistettu!");
});
app.get('/public/omat.html', function (req, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(omat);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>ID</label></td>');
    response.write('<td><label>Aika</label></td>');
    response.write('<td><label>Päivämäärä</label></td>');
    response.write('<td><label>Kohde</label></td>');
    response.write('<td><label>Maa</label></td>');
    response.write('<td><label>Varatut Paikat</label></td>');
    response.write('</tr>');

    let sql = "SELECT time,date,destination_name,country,seats, reservation_id FROM reservations;";
    (async () => {
        try {

            let sql1 = [];
            const rows = await query(sql);
            console.log(rows);
            Object.keys(rows).forEach(function (key) {
                    var row = rows[key];

                    response.write('<tr onclick="remove(this)">');
                    response.write('<td>' + row.reservation_id + '</td>');
                    response.write('<td>' + row.time + '</td>');
                    response.write('<td>' + row.date+ '</td>');
                    response.write('<td>' + row.destination_name+ '</td>');
                    response.write('<td>' + row.country+ '</td>');
                    response.write('<td>' + row.seats + '</td>');
                    response.write('<td><button class="omatbuttons">Muokkaa/Poista</button></td>');
                    response.write('</tr>')
            });

            response.end('</table>')
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
    console.log("Omat Varaukset Ladattu!");

});

var d = new Date();
var hour = d.getUTCHours() +2;
var minute = d.getUTCMinutes();
var month = d.getMonth() +1;
var akkilahdot = fs.readFileSync(__dirname + '/public/akkilahdot.html', "utf-8");
var kohteet = fs.readFileSync(__dirname + '/public/kohteet.html', "utf-8");
var varaus = fs.readFileSync(__dirname + '/public/varaus.html', "utf-8");
var varausvahvistus = fs.readFileSync(__dirname + "/public/varausvahvistus.html","utf-8");
var kohde;
var lahtoaika;
var maara;

app.get('/public/varausvahvistus.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(varausvahvistus);
    response.end();

    //res.sendFile(path.join(__dirname + '/public/varausvahvistus.html'));
    console.log("Varausvahvistus ladattu!");

});
//Päivämäärä muuttujat joilla haetaan kellon aika jolloin käyttäjä menee sivulle. Lisäksi html-sivujen tiedostojen haku muuttujat

app.post('/public/akkilahdot.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(akkilahdot);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>Aika</label></td>');
    response.write('<td><label>Kohde</label></td>');
    response.write('<td><label>Maa</label></td>');
    response.write('<td><label>Jäljellä olevat paikat</label></td>');
    response.write('</tr>');

    let sql = "SELECT time, destination_destination_id, seats FROM schedule WHERE date = '" + d.getFullYear() + "-" + month + "-" +d.getUTCDate()+ "' AND time >= '" +req.body.Startdate+ "' AND time <= '" + req.body.Enddate + "';";
    console.log(sql);
    (async () => {
        try {

            let sql1 = [];
            const rows = await query(sql);
            let string = JSON.stringify(rows);

            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                sql1.push("SELECT * FROM destination WHERE destination_id='" + row.destination_destination_id + "';");

            });

            for (var i = 0; i < sql1.length; i++) {
                const rows2 = await query(sql1[i]);
                Object.keys(rows2).forEach(function (key) {
                    var row = rows2[key];
                    response.write('<tr onclick="myFunction(this)">');
                    response.write('<td><label class="label">' + rows[i].time + '</label></td>');
                    response.write('<td><label class="label">' + row.destination_name+ '</label></td>');
                    response.write('<td><label class="label">' + row.country+ '</label></td>');
                    response.write('<td><label class="label">' + rows[i].seats + '</label></td>');
                    response.write('</tr>');
                });
            }
            response.end('</table>');
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
    //res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
    console.log("Äkkilähdöt ladattu!");

});
app.post('/public/varausvahvistus.html', function (req, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(varausvahvistus);

    let sql = "INSERT INTO reservations (time,date,destination_name,country,seats) VALUES ('" + req.body.aika + "','" + req.body.lahtopaiva + "','" + req.body.kohde + "','" + req.body.maa + "','" + req.body.maara + "')";
    console.log(sql);
    (async () => {
        try {

            let sql1 = [];
            const rows = await query(sql);
            let string = JSON.stringify(rows);
            console.log("Varausksen vahvistus onnistui!");
            response.write('<p id="vahvistustekstit">Varauksen vahvistus onnistui!</p>');
        }
        catch (err) {
            console.log("Database error!"+ err);
            console.log("Varauksen vahvistus epäonnistui!");
            response.write('<p id="vahvistustekstiterror">Varauksen vahvistus epäonnistui!</p>');
        }
    })()

});

app.get('/public/akkilahdot.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(akkilahdot);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>Lähtöaika</label></td>');
    response.write('<td><label>Kohde</label></td>');
    response.write('<td><label>Maa</label></td>');
    response.write('<td><label>Jäljellä olevat paikat</label></td>');
    response.write('</tr>');

    let sql = "SELECT time, destination_destination_id, seats FROM schedule WHERE  date = '" + d.getFullYear() + "-" + month + "-" +d.getUTCDate()+ "' AND time >= '" + hour + ":" + minute+ "';";
    (async () => {
        try {

            let sql1 = [];
            const rows = await query(sql);
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                sql1.push("SELECT * FROM destination WHERE destination_id='" + row.destination_destination_id + "';");

            });

            for (var i = 0; i < sql1.length; i++) {
                const rows2 = await query(sql1[i]);
                Object.keys(rows2).forEach(function (key) {
                    var row = rows2[key];
                    response.write('<tr onclick="myFunction(this)">');
                    response.write('<td>' + rows[i].time + '</td>');
                    response.write('<td>' + row.destination_name+ '</td>');
                    response.write('<td>' + row.country+ '</td>');
                    response.write('<td>' + rows[i].seats + '</td>');
                    response.write('</tr>')
                });
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

app.get('/public/kohteet.html', function (req, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(kohteet);
    response.write('<table id="lennot"><tr>');
    response.write('<td><label>Destination</label></td>');
    response.write('<td><label>Country</label></td>');

    response.write('</tr>');

    let sql = "SELECT * FROM destination;";
    (async () => {
        try {
            const rows = await query(sql);
            console.log(rows);
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                response.write('<tr>');
                response.write('<td><label class="label">' + row.destination_name+ '</label></td>');
                response.write('<td><label class="label">' + row.country+ '</label></td>');
                response.write('</tr>');

            });
            response.end('</table>')
        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
    //res.sendFile(path.join(__dirname + '/public/akkilahdot.html'));
    console.log("kohteet ladattu!");

});

app.get('/public/ohjeet.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/ohjeet.html'));
    console.log("Ohjeet ladattu!");

});
app.get('/public/haku', function (req, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(varaus);


    response.write('</tr>');
    let sql = "SELECT destination_id, destination_name, country FROM destination WHERE destination_name = '" + kohde + "';";
    (async () => {
        try {
            let sql2 = [];
            const rows = await query(sql);
            Object.keys(rows).forEach(function (key) {
                var row = rows[key];
                sql2.push("SELECT * FROM schedule WHERE date='" + lahtoaika + "' AND destination_destination_id = '" + row.destination_id + "' AND seats >= '" + maara + "';");
                console.log(sql2[0]);
            });
                const rows2 = await query(sql2[0]);
                if (sql2 === undefined || sql2.length == 0) {
                    response.write('<p id="etusivup">Valitsemallanne hakuehdoilla ei löytynyt yhtään lentoa</p>');
                } else {
                    response.write('<table id="lennot"><tr>');
                    response.write('<td><label>Aika</label></td>');
                    response.write('<td><label>Kohde</label></td>');
                    response.write('<td><label>Maa</label></td>');
                    response.write('<td><label>Jäljellä olevat paikat</label></td>');
                    Object.keys(rows2).forEach(function (key) {
                        var i = 0;
                        var row = rows2[key];
                        response.write('<tr onclick="myFunction(this)">');
                        response.write('<td>'+ row.time +'</td>');
                        response.write('<td>' + rows[i].destination_name + '</td>');
                        response.write('<td>' + rows[i].country + '</td>');
                        response.write('<td>'+ row.seats +'</td>');
                        i++;
                    });

                }

            response.end('</table>')

        }
        catch (err) {
            console.log("Database error!"+ err);
        }
    })()
});
app.post('/public/haku', function(req,res){
    console.log(req.body.aika);
});

app.post('/public/varaus.html', function(req,res){
    kohde = req.body.kohde;
    console.log(kohde);
    lahtoaika = req.body.lahtoaika;
    maara = req.body.maara;
    console.log(lahtoaika);
    return res.redirect('/public/haku');
});

const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})