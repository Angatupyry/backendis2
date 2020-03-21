const {
    proyecto
} = require('../models')
module.exports = {
    async list(req, res, next) {

        try {
            const i = await proyecto.sequelize.query(`
                    select p.id id, 
                    p.nombre nombre,
                    p.descripcion descripcion,
                    p.fecha_inicio fecha_inicio,
                    p.fecha_fin fecha_fin,
                    e.descripcion estado
                from proyecto p 
                join estado e on e.id = p.estado_id`, {
                type: proyecto.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(i)
        } catch (error) {
            console.log("EndPoint: Error en Proyecto.list")
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