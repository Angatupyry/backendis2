const app = require('express').Router()
const auth = require('../controllers/auth')


app.post('/login', auth.algo)

module.exports = app