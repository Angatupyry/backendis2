const jwt = require('jwt-simple')
const moment = require('moment')
const response = require('../networks/response')
const config = require('../config/config')
const {
    usuario
} = require('../models')
module.exports = {

    async login(req, res) {
        try {
           
            let user
            if (typeof req.body.username === 'undefined' || req.body.username === '') {
                return response.error(req, res, 'Falta el parámetro usuario', 404, '')
            }

            if (typeof req.body.password === 'undefined' || req.body.password === '') {
                return response.error(req, res, 'Falta el parámetro contraseña', 404, '')
            }

            user = await usuario.findOne({
                where: {
                    username: req.body.username
                }
            })

            if (!user) {
                return response.error(req, res, 'No se encontró el usuario', 401, '')
            }

            if (!user.activo) {
                return response.error(req, res, 'Usuario Inactivo', 401, '')
            }

            if (user.password !== req.body.password) {
                return response.error(req, res, 'Password incorrecto', 401, '')
            } else {
                //Tiempo de expiración del token. 
                const expires = moment().add(1, 'd').valueOf()
                const payload = {
                    id: user.id,
                    nombre: req.body.username,
                    exp: expires
                }

                const token = jwt.encode(payload, config.api.secret, config.api.algoritm)

                res.status(201).json({
                    success: true,
                    token: token,
                    user_rol: user.rol,
                    message: 'Login'
                })
            }

        } catch (error) {
            if (error) {
                response.error(req, res, 'Error inesperado', 500, '')
            }
        }
    }
}