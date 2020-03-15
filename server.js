const express = require('express')
const bodyParser = require('body-parser')
const router = require('././networks/routes')
const config = require('./config/config')
const app = express()
const {
  errorHandler
} = require('./middelwares')
const cors = require('cors')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors(config.api.corsOptions))

app.set('x-powered-by', false)
app.use(xPoweredBy)


function xPoweredBy(req, res, next) {
  res.header('X-Powered-By', '')
  res.header('X-Hello-Human', '')
  next()
}

app.use('/', router)

app.use(errorHandler)

app.listen(config.api.port, () => {
  console.log(`Escuchando en http://localhost:${config.api.port}`)
})