
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var mysql = require('mysql')

const app = express()
const port = 3000
const ipAddr = '127.0.0.1'

app.use(express.static('./formPublic'))
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yA785844",
    database: "records"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post("/", (req, res) => {

    let topicCount = 0

    let entries = {
        province: 'NULL',
        html: '',
        css: '',
        js: '',
        python: '',
        ruby: '',
        format: 'NULL'
    }

    for (var x in req.body) {
        if (!req.body[x]) {
            entries[x] = 'NULL'
        } else {
            entries[x] = req.body[x]
        }
    }

    if(req.body.html || req.body.css || req.body.js || req.body.python || req.body.ruby) {
        topicCount += 1;
    }


    var query = `INSERT INTO directory (id, full_name, email, phone, addr, city, province, 
        postal_code, topics, newsletter_format, other_topics) 
        VALUES (NULL, '${entries.person_name}', '${entries.email}', '${entries.phone}', 
        '${entries.address}', '${entries.city}', '${entries.province}', '${entries.postal_code}', 
        '${topicCount === 0 ? 'NULL' : ''}
         ${topicCount > 0 && entries.html ? entries.html : ''} 
         ${topicCount > 0 && entries.css ? entries.css : ''} 
         ${topicCount > 0 && entries.js ? entries.js : ''} 
         ${topicCount > 0 && entries.python ? entries.python: ''} 
         ${topicCount > 0 && entries.ruby ? entries.ruby: ''}', 
        '${entries.format}', '${entries.other_topics}');`
  
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("/Search")    
    });
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