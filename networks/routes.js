const app = require('express').Router()
const auth = require('../controllers/auth')
const crudCommon = require('../networks/crud_common')
const {
    usuario
} = require('../models/usuario')

const {
    mwToken
} = require('../middelwares')

app.post('/login', auth.login)
//app.use(mwToken)
app.use('/usuarios', crudCommon(usuario))


module.exports = app