var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;

var osoby = ["Klimcia", "Natka", "Przemek", "Klaudia", "Paweł"]
var doLosowania = ["Klimcia", "Natka", "Przemek", "Klaudia", "Paweł"]
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
    if (osoby.length == 0) {
        html = '<style>*{font-family: DejaVu Sans Mono, monospace; color: white; font-size: 50px;} body{text-align: center; background-color: #333;}</style>Wszyscy już wylosowali!<br><img src="./gfx/1.gif">'
    }
    res.send(html)
})

app.post("/wylosowano", function (req, res) {
    var html = '<style>*{font-family: DejaVu Sans Mono, monospace; color: white; font-size: 50px;} body{text-align: center; background-color: #333;}</style>'
    if (osoby.length == 0) {
        html += 'Wszyscy już wylosowali!<br><img src="./gfx/1.gif">'
    } else {
        nieOk = false
        for (let i = 0; i < losowali.length; i++) {
            if (losowali[i] == req.body.kto) {
                nieOk = true
                break
            }
        }
        if (nieOk) {
            html += 'Oj nie nie byczq, losujemy tylko raz!!!'
        } else {
            do {
                var spr = false
                var id = Math.floor(Math.random() * osoby.length)


                if (osoby.length == 2) {
                    if (id == 0) {
                        for (let i = 0; i < doLosowania.length; i++) {
                            if (doLosowania[i] == osoby[1]) {
                                spr = true
                                break
                            }
                            else {
                                spr = false
                            }
                        }
                    } else {
                        for (let i = 0; i < doLosowania.length; i++) {
                            if (doLosowania[i] == osoby[0]) {
                                spr = true
                                break
                            }
                            else {
                                spr = false
                            }
                        }
                    }
                }
            } while (req.body.kto == osoby[id] || spr)
            html += 'Wylosowano:<br>' + osoby[id]
            osoby.splice(id, 1)
            doLosowania.splice(doLosowania.indexOf(req.body.kto), 1)
        }
    }
    res.send(html)
})

app.use(express.static('static'))
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
