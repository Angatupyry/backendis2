const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')
const config = require('./config')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Direccion del API
app.use('/', router)

app.listen(config.api.port, () => {
    console.log(`Escuchando en http://localhost:${config.api.port}`)
})