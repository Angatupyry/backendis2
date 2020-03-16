/*
  Utiización de verbos para cualquier modelo
*/ 
module.exports = function (modelo) {

  const router = require('express').Router()

  router.get('/', (req, res, next) => {
    modelo.findAll({
        order: [
          ['id', 'ASC']
        ]
      })
      .then(modelo => {
        if (!modelo.length) return res.status(200).json([])
        res.status(200).json(modelo)
      })
      .catch(error => {
        return next(error)
      })
  })

  router.get('/:id', (req, res, next) => {
    modelo.findAll({
        where: {
          id: req.params.id
        }
      })
      .then(modelo => {
        if (!modelo.length) return res.status(404).json({
          message: `No se encontro el id ${req.params.id}`
        })
        res.status(200).json(modelo)
      })
      .catch(error => {
        return next(error)
      })
  })

  router.post('/', (req, res, next) => {
    modelo.create(req.body)
      .then(modelo => {
        res.status(201).json(modelo)
      })
      .catch(error => {
        return next(error)
      })
  })

  router.put('/:id', (req, res, next) => {
    modelo.update(req.body, {
        where: {
          id: req.params.id || req.body.id
        },
        returning: true
      })
      .then(modelo => {
        if (modelo[0] === 0) return res.status(404).json([])
        res.status(204).end()
      })
      .catch(error => {
        return next(error)
      })
  })

  router.delete('/:id', (req, res, next) => {
    modelo.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(affectedRows => {
        if (affectedRows === 0) return res.status(404).json({
          message: 'No se eliminaron registros.'
        })
        res.status(204).end()
      })
      .catch(error => {
        return next(error)
      })
  })

  return router;

}