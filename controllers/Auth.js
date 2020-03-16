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
            //DATOS TEMPORALES DE PRUEBA
            const userTemp = [{
                    id: 1,
                    username: 'crolon',
                    password: '123',
                    activo: true,
                    rol: 'admin'
                },
                {
                    id: 2,
                    username: 'aestigarribia',
                    password: '456',
                    activo: true,
                    rol: 'desarrollador'
                }
            ]
            let noExiste = 0
            let user = noExiste
            if (typeof req.body.username === 'undefined' || req.body.username === '') {
                return response.error(req, res, 'Falta el parámetro usuario', 404, '')
            }

            if (typeof req.body.password === 'undefined' || req.body.password === '') {
                return response.error(req, res, 'Falta el parámetro contraseña', 404, '')
            }

            //Buscar usuario en la base de datos
            //Por el momento solo usamos datos en duro para las pruebas
            // user = await usuario.findOne({
            //     where: {
            //         username: req.body.username
            //     }
            // })
            for (let i = 0; i < userTemp.length; i++) {
                if (userTemp[i].username === req.body.username) {
                    user = userTemp[i]
                } 
            }

            if (user === noExiste) {
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