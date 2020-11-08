const {
    item,
    estado
} = require('../models')
module.exports = {
    async create(req, res, next) {
        try {
            let newItem
            
            const estadoIniciado = await estado.findOne({
                where: {
                    nombre_tabla: 'Item',
                    descripcion: 'Iniciado'
                }
            })

            const findItem = await item.findAll({
                where: {
                    proyecto_id: req.params.proyecto_id
                }
            })

            const findStartedStatus = await item.findAll({
                where: {
                    proyecto_id: req.params.proyecto_id,
                    estado_id: estadoIniciado.id
                }
            })

            if (!findItem.length) {
                newItem = await item.create({
                    version: req.body.version,
                    prioridad_id: req.body.prioridad_id,
                    estado_id: estadoIniciado.id,
                    descripcion: req.body.descripcion,
                    observacion: req.body.observacion,
                    proyecto_id: req.params.proyecto_id,
                    id_tarea_padre: null
                })
            } else {
                const estadoPendiente = await estado.findOne({
                    where: {
                        nombre_tabla: 'Item',
                        descripcion: 'Pendiente'
                    }
                })
                newItem = await item.create({
                    version: req.body.version,
                    prioridad_id: req.body.prioridad_id,
                    estado_id: !findStartedStatus.length ? estadoIniciado.id : estadoPendiente.id,
                    descripcion: req.body.descripcion,
                    observacion: req.body.observacion,
                    proyecto_id: req.params.proyecto_id,
                    id_tarea_padre: findItem[findItem.length - 1].id
                })
            }

            res.status(201).json(newItem)

        } catch (error) {
            return res.status(503).json({
                "userMessage": true,
                "message": "Lo sentimos, ha ocurrido un error"
            })
        }
    },

    async list(req, res, next) {

        try {
            const tareas = await item.sequelize.query(`
                                    select i.id ,
                                    pro.id proyecto_id,
                                    p.descripcion nombre_prioridad,
                                    e.descripcion estado,
                                    i.observacion,
                                    i.descripcion,
                                    pro.nombre proyecto_nombre,
                                    lbd.id pertenece_a_lb
                            from item i
                            join prioridad_item p on p.id = i.prioridad_id
                            join estado e on e.id = i.estado_id
                            join proyecto pro on pro.id = i.proyecto_id
                            left join linea_base_detalle lbd on lbd.item_id = i.id
                            order by pro.id, e.id`, {
                type: item.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(tareas)
        } catch (error) {
            console.log("EndPoint: Error en Item.list")
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

    async updateState(req, res, next) {
        try {
            const [estadoFinalizado, estadoIniciado] = await Promise.all([
                estado.findOne({
                    where: {
                        nombre_tabla: 'Item',
                        descripcion: 'Finalizado'
                    }
                }),
                estado.findOne({
                    where: {
                        nombre_tabla: 'Item',
                        descripcion: 'Iniciado'
                    }
                })
            ])

            let tarea = {
                estado_id: estadoFinalizado.id
            }

            item.update(tarea, {
                where: {
                    id: req.params.id
                }
            })

            let nextItem = await item.findOne({
                where: {
                    id_tarea_padre: req.params.id
                }
            })

            if (nextItem) {
                let nexTarea = {
                    estado_id: estadoIniciado.id
                }

                item.update(nexTarea, {
                    where: {
                        id: nextItem.id
                    }
                })
            }

            return res.status(204).end()

        } catch (error) {
            return next(error)
        }
    }
}