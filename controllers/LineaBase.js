const {
    linea_base
} = require('../models')
module.exports = {
    async list(req, res, next) {

        try {
            const lb = await linea_base.sequelize.query(`
                select l.nombre nombre_lb, 
                       l.id id_lb,
                       e.descripcion estado, 
                       pi.descripcion prioridad, 
                       p.nombre nombre_proyecto,
                       i.descripcion
                from  linea_base l
                join item i on i.id = l.item_id
                join estado e on e.id = i.estado_id
                join prioridad_item pi on pi.id = i.prioridad_id
                join proyecto p on p.id = i.proyecto_id
                order by i.proyecto_id`, {
                type: linea_base.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(lb)
        } catch (error) {
            console.log("EndPoint: Error en LineaBase.list")
            console.log('Fecha del Error: ', new Date())
            console.log('Host:', req.headers.host)
            console.log('Ip:', req.headers.ip)
            console.log('Body:', req.body)
            console.log('Error:', error)
            next(error)
            return res.status(503).json({
                "userMessage": true,
                "message": "Lo sentimos, ha ocurrido un error"
            })
        }
    }
}