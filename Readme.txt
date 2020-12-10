APP.GET /public/index.html:

Avaa index.html ensimmäisenä, kun sivusto avataan eli etusivun.

APP.GET /public/akkilahdot.html:

Avaa akkilahdot.html ja luo taulukon tietokantakyselyllä, jossa näkyvät lähtöaika,kohde,maa ja jäljellä olevat paikat.
Klikkaamalla lentoa pääsee varaamaan lennon.

APP.POST /public/akkilahdot.html:

"Hae"-nappia painamalla lataa sivun uudestaan, mutta muuttaa kyselyn annetun aikavälin perusteella.
Tämän johdosta myös taulukko muuttuu sen perusteella.
Klikkaamalla lentoa pääsee varaamaan lennon.

APP.GET /public/kohteet.html:

Avaa kohteet.html ja luo taulukon tietokantakyselyllä, jossa näkyvät kaikki mahdolliset kohteet ja niiden maat.
Klikkaamalla kohdetta pääsee tarkastelemaan kaikki kohteeseen meneviä lentoja.

APP.GET /public/muokkaus.html:

Avaa muokkaus.html.

APP.POST /public/muokkaus.html:

"Vahvista muokkaukset"-nappi päivittää annetun paikkojen määrän tietokantaan ja tarkistaa onko lennolla tarpeeksi
paikkoja ja antaa viestin "Muokkaus onnistui" tai "Muokkaus epäonnistui" sen mukaisesti.

APP.POST /public/poisto:

"Poista varaus"-nappi poistaa valitun lennonvarauksen tietokannasta ja "Omat varaukset"-kohdan taulukosta.

APP.GET /public/ohjeet.html:

Avaa ohjeet.html.

APP.GET /public/omat.html:

Avaa omat.html ja luo taulukon tietokantakyselyllä reservations-taulusta. Klikkaamalla "Muokkaa/Poista"-nappia
pääsee muokkaamaan varausta tai poistamaan sen kokonaan.

APP.GET /public/haku:

"Hae"-nappia painettaessa luo varaus.html sivulle taulukon, johon tietokannasta saadaan halutuilla parametreillä
vastaavat lennot. Jos yhtään lentoja ei löydy, tulostuu viesti "Valitsemallanne hakuehdoilla ei löytynyt yhtään lentoa".
Klikkaamalla lentoa pääsee varauksen vahvistukseen.

APP.GET /public/varaus.html:

Avaa varaus.html.

APP.POST /public/varaus.html:

Haetaan input-kentistä tiedot, jotta niitä voidaan käyttää tietokantakyselyssä haku-kohdassa.
Ohjaa haku-kohtaan tämän jälkeen.

APP.GET /public/varausvahvistus.html:

Avaa varausvahvistus.html.

APP.POST /public/varausvahvistus.html:

"Vahvista"-nappi lisää varauksen reservations("Omat Varaukset")-tietokantatauluun. Tässä kohdassa myös tarkistetaan,
että paikkojen määrä ei mene vapaiden paikkojen yli.

APP.GET /public/:id:

URL-osoitteesta haetaan nimi, jonka perusteella luodaan tietokannasta taulukko, josta näkyvät kaikki kohteen lennot.
URL-osoitteeseen nimi tulee, kun klikkaa kohdetta "Kaikki kohteet"-osiossa.



