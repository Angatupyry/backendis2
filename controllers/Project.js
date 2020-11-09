const {
    proyecto,
    estado
} = require('../models')
module.exports = {
    async list(req, res, next) {

        try {
            //Cambio de última hora. El valor viene como string y no encontré cómo castear a boolean. 
            //Desde el front se debería de mandar de otra manera pero... IS2. 
            //NO HACER ESTO EN UN SOFTWARE REAL.
            if (req.params.showProjectFinalized === 'true') {

                const pro = await proyecto.sequelize.query(`
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

                res.status(200).json(pro)

            } else {

                const estadoFinalizado = await estado.findOne({
                    where: {
                        nombre_tabla: 'Proyecto',
                        descripcion: 'Finalizado'
                    }
                })

                const pro = await proyecto.sequelize.query(`
                select p.id id,
                p.nombre nombre,
                p.descripcion descripcion,
                p.fecha_inicio fecha_inicio,
                p.fecha_fin fecha_fin,
                e.descripcion estado
                from proyecto p
                join estado e on e.id = p.estado_id
                where p.estado_id <> ${estadoFinalizado.id}`, {
                    type: proyecto.sequelize.QueryTypes.SELECT
                })

                res.status(200).json(pro)
            }

        } catch (error) {
            console.log("EndPoint: Error en Proyecto.list")
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