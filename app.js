
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const ipAddr = '127.0.0.1'

app.use(express.static('./formPublic'))
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post("/", (req, res) => {
    console.log(req.body)
    console.log(req.body.username)
    for (var x in req.body) {
        console.log(req.body[x] + "\n")
    } 
    res.redirect("/Search")
})

app.get("/Search", (req, res) => {
    app.use(express.static('./searchPublic'))
    res.render('search')
})

app.post("/Search", (req, res) => {
    console.log(req.body.nameSearch)
    res.render('search')
})

app.listen(port, ipAddr)