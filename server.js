const express = require('express')
const app = express()
const router = express.Router()

app.get('/', function (req, res, next) {
    res.send('')
})

const server = app.listen(3000, function () {
    console.log(`Escuchando en http://localhost:${server.address().port}`)
})