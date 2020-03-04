const jwt = require('jwt-simple')
const moment = require('moment')
const response = require('../networks/response')
const config = require('../config')
module.exports = {
    login: function (req, res) {
        try {
            if (typeof req.body.user === 'undefined' || req.body.user === '') {
                response.error(req, res, 'Falta el parámetro usuario', 404, '')
            }

            if (typeof req.body.password === 'undefined' || req.body.password === '') {
                response.error(req, res, 'Falta el parámetro contraseña', 404, '')
            }
            //Tiempo de expiración del token. 
            const expires = moment().add(1, 'd').valueOf()
            const payload = {
                id: 1,
                nombre: req.body.user,
                exp: expires
            }

            const token = jwt.encode(payload, config.api.secret, config.api.algoritm)

            res.status(201).json({
                success: true,
                token: token,
                message: 'Login exitoso'
            })
        } catch (error) {
            if (error) {
                response.error(req, res, 'Error inesperado', 500, '')
            }
        }
    }
}