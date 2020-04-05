const crypto = require('crypto')
const {
    usuario
} = require('../models')
module.exports = {
    async create(req, res, next) {
        try {
            const pass = req.body.password;
            const passwordEncriptado = crypto.createHash('md5').update(pass).digest("hex");
            const user = await usuario.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                rol_id: req.body.rol_id,
                username: req.body.username,
                password: passwordEncriptado
            })
            res.status(200).json({
                user
            })

        } catch (error) {
            return next(error)
        }
    },

    async list(req, res, next) {

        try {
            const user = await usuario.sequelize.query(`
                                select u.id, 
                                        u.username, u.nombre, u.apellido,
                                        u.email, r.descripcion, u.activo 
                                from usuario u
                                join rol r on r.id = u.rol_id
                                where u.activo`, {
                type: usuario.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(user)
        } catch (error) {
            console.log("EndPoint: Error en Usuario.list")
            console.log('Fecha del Error: ', new Date())
            console.log('Host:', req.headers.host)
            console.log('Ip:', req.headers.ip)
            console.log('Body:', req.body)
            console.log('Error:', error)

            return res.status(503).json({
                "userMessage": true,
                "message": "Lo sentimos, ha ocurrido un error"
            })
        }
    },

    async update(req, res, next) {
        try {

            let user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                rol_id: req.body.rol_id,
                username: req.body.username
            }

            await usuario.update(user, {
                where: {
                    id: req.params.id
                }
            })

            return res.status(204).end()

        } catch (error) {
            return next(error)
        }
    },

    async delete(req, res, next) {
        try {

            await usuario.update({
                activo: false
            }, {
                where: {
                    id: req.params.id
                },
                returning: true,
                plain: true
            })

            return res.status(204).end()

        } catch (error) {
            return next(error)
        }
    }
}