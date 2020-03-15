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
            if (typeof decoded.id === 'undefined') {
                res.status(401).json({
                    success: false,
                    message: 'El token enviado es inválid. No contiene codigo de usuario.'
                })
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
                console.log('Datos enviados al front ', req.datos)
            }

        } catch (error) {
            response.error(req, res, error, 401, 'El token enviado es inválido')
        }
    } else {
        response.error(req, res, 'No encontramos el token referido', 403, '')
    }
}

function errorHandler(err, req, res, next) {
    console.error('Fecha del Error: ', new Date())
    console.error('Host:', req.headers.host)
    console.error('Ip:', req.headers.ip)
    console.error('Body:', req.body)
    if (req.errorDescription) {
        console.error('Descripción específica del error:', req.errorDescription)
    }
    console.error('Error: ', err)
    switch (err.name) {
        case 'PasswordDoNotMatch':
            // 401: La clave ingresada no coincide con la que se encuentra registrada en la bd.
            return res.status(401).json({
                "userMessage": true,
                "message": err.message
            })
        case 'SequelizeValidationError':
            // 422: Request matched and met syntactic contract but validation failed.
            return res.status(422).json({
                "userMessage": true,
                "message": err.errors[0].message
            })
        case 'KeysDoNotMatch':
            // 401: Las claves ingresadas no coinciden.
            return res.status(401).json({
                "userMessage": true,
                "message": err.message
            })
        case 'SequelizeForeignKeyConstraintError':
            // 409: The request could not be completed due to a conflict with the current state of the resource.
            return res.status(409).json({
                "userMessage": true,
                "message": "No se pudo eliminar el registro porque guarda relación con otro."
            })
        case 'SequelizeUniqueConstraintError':
            // 409: When a PUT is used to an identifier that already exists or a POST (creation or update) breaks a unique constraint.
            return res.status(409).json({
                "userMessage": true,
                "message": "Ya existe un registro con las mismas relaciones"
            })
        case 'UnsupportedImageFormat':
            // 415: The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format
            return res.status(415).json({
                "userMessage": true,
                "message": "El formato de imagen es invalido, los formatos validos son : jpeg, jpg, jpe, png"
            })
        case 'UnsupportedFileFormat':
            // 415: The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method..
            return res.status(415).json({
                "userMessage": true,
                "message": "El formato de archivo es invalido, los formatos validos son : pdf, doc, jpeg, jpg, jpe, png"
            })
        case 'Error':
            switch (err.code) {
                case 'ESOCKETTIMEDOUT':
                    // 503: The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
                    return res.status(503).json({
                        "userMessage": true,
                        "message": "Lo sentimos, en estos momentos no podemos realizar la operacion solicitada, intentelo de nuevo mas tarde"
                    })
                case 'ENOENT':
                    // 503: The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
                    return res.status(503).json({
                        "userMessage": true,
                        "message": "Lo sentimos, la imagen de Perfil no puede ser encontrada, intentelo mas tarde, si el problema persiste favor contactar con un Administrador"
                    })
                default:
                    return res.status(500).json({
                        "userMessage": false,
                        "message": err
                    })
            }
            default:
                return res.status(500).json({
                    "userMessage": false,
                    "message": err
                })
    }
}

module.exports = {
    mwToken,
    errorHandler
}