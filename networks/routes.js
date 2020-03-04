const app = require('express').Router()
const auth = require('../controllers/auth')
const {
    mwToken
} = require('../middelwares')

app.post('/login', auth.login)
app.use(mwToken)


module.exports = app