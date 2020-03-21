const estado = require('../models')
module.exports = {
  async listroles(req, res, next){
    try {
        const estados = await estado.findAll({
            where: {
                nombre_tabla: req.params.table_name,
            }
        })
        res.status(200).json(rolList)
    } catch (error) {
        console.log("EndPoint: Error en Rol.list")
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