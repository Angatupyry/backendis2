const jwt = require('jwt-simple')
const moment = require('moment')
const response = require('../networks/response')
const config = require('../config/config')
module.exports = {
    login: function (req, res) {
        try {
            if (typeof req.body.username === 'undefined' || req.body.username === '') {
                return response.error(req, res, 'Falta el parámetro usuario', 404, '')
            }

            if (typeof req.body.password === 'undefined' || req.body.password === '') {
                return response.error(req, res, 'Falta el parámetro contraseña', 404, '')
            }
            //Tiempo de expiración del token. 
            const expires = moment().add(1, 'd').valueOf()
            const payload = {
                id: 1,
                nombre: req.body.username,
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