const {
    usuario
} = require('../models')
module.exports = {
    async list(req, res, next) {

        try {
            const user = await usuario.sequelize.query(`
                                select u.id, 
                                        u.username, u.nombre, u.apellido,
                                        u.email, r.descripcion, u.activo 
                                from usuario u
                                join rol r on r.id = u.rol_id`, {
                type: usuario.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(user)
        } catch (error) {
            console.log("EndPoint: Error en Usuario.list")
            console.log('Fecha del Error: ', new Date())
            console.log('Host:', req.headers.host)
            console.log('Ip:', req.headers.ip)
            console.log('Body:', req.body)
            console.log('Giro ID:', req.params.id)
            console.log('Error:', error)

            return res.status(503).json({
                "userMessage": true,
                "message": "Lo sentimos, ha ocurrido un error"
            })
        }
    }
}