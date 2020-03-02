const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')
const config = require('./config')
const app = express()

app.use(bodyParser.json())
router(app)

app.get('/', function (req, res, next) {
    res.send('')
})

app.listen(config.api.port, () => {
    console.log(`Escuchando en http://localhost:${config.api.port}`)
})