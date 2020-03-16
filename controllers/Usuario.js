module.exports = {
    create: function (req, res, next) {

        try {
            const userTemp = [{
                    id: 1,
                    username: 'crolon',
                    password: '123',
                    activo: true
                },
                {
                    id: 2,
                    username: 'aestigarribia',
                    password: '456',
                    activo: true
                }
            ]

            const newUser = userTemp.push({
                id: 2,
                username: req.body.username,
                password: req.body.password,
                activo: true
            })

            res.status(201).json({
                newUser
            })

        } catch (error) {
            return next(error)
        }
    },

    list: function (req, res, next) {
        const userTemp = [{
                id: 1,
                username: 'crolon',
                password: '123',
                activo: true
            },
            {
                id: 2,
                username: 'aestigarribia',
                password: '456',
                activo: true
            }
        ]
        console.log(userTemp)
        res.status(200).json({
            userTemp
        })
    }

}