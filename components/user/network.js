const express = require('express')
const response = require('../../networks/response')
const test = require('../auth/controller')

const router = express.Router()

router.get('/', function (req, res) {
    console.log(req.headers)
    res.header({
        "custom-header": "Algún valor"
    })
    response.success(req, res, "Lista de mensajes")
})

router.post('/', test.algo)
// router.post('/', function (req, res) {
//     test.algo
//     if (req.query.error == 'ok') {
//         response.error(req, res, 'Error inesperado', 500, 'test')
//     } else {
//         response.success(req, res, 'Creado correctamente', 201)
//     }
// })

module.exports = router