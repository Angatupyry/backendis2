const jwt = require('jwt-simple')
module.exports = {
    algo: function (req, res) {


        const payload = {
            id: 1,
            nombre: req.body.user
        }

        const token = jwt.encode(payload, '!laclave!', 'HS512')

        res.status(201).json({
            success: true,
            token: token,
            message: 'Login exitoso'
        })
    }

}
