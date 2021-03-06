const {
    linea_base,
    linea_base_detalle,
    estado,
    item
} = require('../models');
const lodash = require('lodash');
module.exports = {

    async create(req, res, next) {
        try {
            let newBaseLineDetails

            //Busca si alguna tarea tiene un proyecto distinto.
            let itemFlag = req.body.items[0].proyecto_id
            for (let i = 0; i < req.body.items.length; i++) {
                if (itemFlag !== req.body.items[i].proyecto_id) {
                    return res.status(503).json({
                        "userMessage": true,
                        "message": "Algún ítem no pertenecen al proyecto seleccionado"
                    })
                }
            }

            const estadoIniciado = await estado.findOne({
                where: {
                    nombre_tabla: 'Linea Base',
                    descripcion: 'Iniciado'
                }
            })

            const newBaseLine = await linea_base.create({
                nombre: req.body.nombre,
                proyecto_id: req.body.items[0].proyecto_id,
                estado_id: estadoIniciado.id
            })

            for (let i = 0; i < req.body.items.length; i++) {
                newBaseLineDetails = await linea_base_detalle.create({
                    item_id: req.body.items[i].id,
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
                       i.descripcion,
                       i.version
                from  linea_base l
                join linea_base_detalle lbd on lbd.linea_base_id = l.id
                join item i on i.id = lbd.item_id
                join estado e on e.id = i.estado_id
                join prioridad_item pi on pi.id = i.prioridad_id
                join proyecto p on p.id = i.proyecto_id
                order by i.proyecto_id`, {
                type: linea_base.sequelize.QueryTypes.SELECT
            })

            const lbOrderByName = lodash.groupBy(lb, 'nombre_lb')
            res.status(200).json(lbOrderByName)
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