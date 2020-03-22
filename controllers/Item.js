const {
    item
} = require('../models')
module.exports = {
    async list(req, res, next) {

        try {
            const i = await item.sequelize.query(`
                                    select i.id , 
                                    p.descripcion nombre_prioridad,
                                    e.descripcion estado, 
                                    i.observacion, 
                                    i.descripcion,
                                    f.nombre fase_nombre
                            from item i
                            join prioridad_item p on p.id = i.prioridad_id
                            join estado e on e.id = i.estado_id
                            join fase f on f.id = i.fase_id`, {
                type: item.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(i)
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