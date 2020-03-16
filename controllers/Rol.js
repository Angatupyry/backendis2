module.exports = {
    create: function (req, res, next) {

        try {
            const rolTem = [{
                    id: 1,
                    descripcion: 'administracion'
                },
                {
                    id: 2,
                    descripcion: 'lider de proyecto'
                },
                {
                    id: 3,
                    descripcion: 'desarrollo'
                }
            ]

            const newRol = rolTem.push({
                id: 2,
                descripcion: req.body.descripcion
            })

            res.status(201).json({
                newRol
            })

        } catch (error) {
            return next(error)
        }
    },

    list: function (req, res, next) {

    }

}