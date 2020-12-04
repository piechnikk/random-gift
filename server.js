var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;

var osoby = ["Paweł", "Klaudia", "Natka", "Klimcia", "Josh"]
var losowali = []
var nieOk = false

var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path")

var html = '<style>*{font-family: DejaVu Sans Mono, monospace; font-size: 50px;} body{text-align: center; color: white; background-color: #333;} form{margin-top: 30px;}</style>Wybierz kim jesteś i kliknij losuj<form action="/wylosowano" method="post"><select name="kto" size="' + osoby.length + '">'
for (let i = 0; i < osoby.length; i++) {
    html += '<option>' + osoby[i] + '</option>'
}
html += '</select><br><br><button type="submit">Losuj!!!</button></form>'

app.get("/", function (req, res) {
    res.send(html)
})

app.post("/wylosowano", function (req, res) {
    nieOk = false
    for (let i = 0; i < losowali.length; i++) {
        if (losowali[i] == req.body.kto) {
            nieOk = true
            break
        }
    }
    var html = '<style>*{font-family: DejaVu Sans Mono, monospace; color: white; font-size: 50px;} body{text-align: center; background-color: #333;}</style>'
    if (nieOk) {
        html += 'Oj nie nie byczq losujemy tylko raz!!!'
    } else {
        do {
            var id = Math.floor(Math.random() * osoby.length)
            console.log(osoby[id])
        } while (req.body.kto == osoby[id])
        html += 'Wylosowano:<br>' + osoby[id]
        osoby.splice(id, 1)
        losowali.push(req.body.kto)
    }
    res.send(html)
})

app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})