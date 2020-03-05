const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')
const config = require('./config')
const app = express()
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(config.api.corsOptions))
// Agragamos el header powered-by Vamyal S.A. en un middleware
app.set('x-powered-by', false)
app.use(xPoweredBy)


function xPoweredBy(req, res, next) {
    res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>')
    res.header('X-Hello-Human', 'Somos @vamyalsa, Escribinos a <contacto@vamyal.com>')
    next()
  }

app.use('/', router)

app.listen(config.api.port, () => {
    console.log(`Escuchando en http://localhost:${config.api.port}`)
})