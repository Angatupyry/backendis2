const {
    item,
    estado
} = require('../models')
module.exports = {
    async create(req, res, next) {
        try {
            let newItem

            const findItem = await item.findAll({
                where: {
                    proyecto_id: req.params.proyecto_id
                }
            })

            if (!findItem.length) {
                const estadaoIniciado = await estado.findOne({
                    where: {
                        nombre_tabla: 'Item',
                        descripcion: 'Iniciado'
                    }
                })

                newItem = await item.create({
                    version: "1",
                    prioridad_id: req.body.prioridad_id,
                    estado_id: estadaoIniciado.id,
                    descripcion: req.body.descripcion,
                    observacion: req.body.observacion,
                    proyecto_id: req.params.proyecto_id,
                    id_tarea_padre: null
                })
            } else {
                const estadaoPendiente = await estado.findOne({
                    where: {
                        nombre_tabla: 'Item',
                        descripcion: 'Pendiente'
                    }
                })
                newItem = await item.create({
                    version: "1",
                    prioridad_id: req.body.prioridad_id,
                    estado_id: estadaoPendiente.id,
                    descripcion: req.body.descripcion,
                    observacion: req.body.observacion,
                    proyecto_id: req.params.proyecto_id,
                    id_tarea_padre: findItem[findItem.length - 1].id
                })
            }

            res.status(201).json(newItem)

        } catch (error) {
            return next(error)
        }
    },

    async list(req, res, next) {

        try {
            const i = await item.sequelize.query(`
                                    select i.id , 
                                    p.descripcion nombre_prioridad,
                                    e.descripcion estado, 
                                    i.observacion, 
                                    i.descripcion,
                                    pro.nombre proyecto_nombre
                            from item i
                            join prioridad_item p on p.id = i.prioridad_id
                            join estado e on e.id = i.estado_id
                            join proyecto pro on pro.id = i.proyecto_id
                            order by pro.id, e.id`, {
                type: item.sequelize.QueryTypes.SELECT
            })
            res.status(200).json(i)
        } catch (error) {
            console.log("EndPoint: Error en Item.list")
            console.log('Fecha del Error: ', new Date())
            console.log('Host:', req.headers.host)
            console.log('Ip:', req.headers.ip)
            console.log('Body:', req.body)
            console.log('Error:', error)

            return next(error)
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