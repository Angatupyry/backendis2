const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')

const app = express()

app.use(bodyParser.json())
router(app)

app.get('/', function (req, res, next) {
    res.send('')
})

const server = app.listen(3000, function () {
    console.log(`Escuchando en http://localhost:${server.address().port}`)
})