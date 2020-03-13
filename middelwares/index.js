const jwt = require('jwt-simple')
const config = require('../config/config')
const response = require('../networks/response')

function mwToken(req, res, next) {
    let token = req.headers['authorization'] || ''
    if (token !== '') {
        if (token.indexOf('Bearer ') > -1) {
            token = token.replace('Bearer ', '')
        }
        try {
            const decoded = jwt.decode(token, config.api.secret, config.api.algoritm)
            if (typeof decoded.exp === 'undefined') {
                response.error(req, res, 'El token tiene que tener una fecha de expiración',
                    401, '')
                return
            }

            if (decoded.exp <= Date.now()) {
                response.error(req, res, 'El token ha expirado', 401, '')
            } else {
                req.datos = {
                    id: decoded.id,
                    usuario: decoded.user
                }
                next()
            }

        } catch (error) {
            response.error(req, res, error, 401, '')
        }
    } else {
        response.error(req, res, 'No encontramos el token referido', 403, '')
    }
}

module.exports = {
    mwToken
}