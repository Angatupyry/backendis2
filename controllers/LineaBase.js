const {
    linea_base,
    linea_base_detalle
} = require('../models')
module.exports = {

    async create(req, res, next) {
        try {
            let newBaseLineDetails;
            const newBaseLine = await linea_base.create({
                nombre: req.body.nombre,
                proyecto_id: req.params.proyecto_id,
                estado_id: req.body.estado_id
            })

            for (let i = 0; i < req.body.items.length; i++) {
                newBaseLineDetails = await linea_base_detalle.create({
                    item_id: req.body.items[i],
                    linea_base_id: newBaseLine.id
                })
            }
            res.status(200).json({
                message: 'Línea base creada',
                lineaBase: newBaseLine,
                detalles: newBaseLineDetails
            })

        } catch (error) {
            console.log("EndPoint: Error en LineaBase.create")
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
    },


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
                join linea_base_detalle lbd on lbd.linea_base_id = l.id
                join item i on i.id = lbd.item_id
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
            return res.status(503).json({
                "userMessage": true,
                "message": "Lo sentimos, ha ocurrido un error"
            })
        }
    }
}