
const express = require('express')
const path = require('path')

const app = express()
const port = 3000
const ipAddr = '127.0.0.1'

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.listen(port, ipAddr)