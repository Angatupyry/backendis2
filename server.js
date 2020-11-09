const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')
const config = require('./config/config')
const app = express()
const cors = require('cors')
const {
  errorHandler
} = require('./middelwares')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors(config.api.corsOptions))

app.set('x-powered-by', false)
app.use(xPoweredBy)


function xPoweredBy(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.header('X-Powered-By', '')
  res.header('X-Hello-Human', '')
  next()
}

app.use('/', router)

// Resto de rutas
app.use('*', (req, res, next) => {
  var d = new Date()
  res.status(404).json({
    success: false,
    timestamp: d,
    ip: req.ip,
    ips: req.ips,
    method: req.method,
    originalUrl: req.originalUrl,
    message: '404 - Not Found',
    author: `Gestión de Proyectos ${d.getFullYear()}`
  })
  next()
})

app.use(errorHandler)

app.listen(config.api.port, () => {
  console.log(`Escuchando en http://localhost:${config.api.port}`)
})