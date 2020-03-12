const Sequelize = require('sequelize')
const setupDataBase = require('../services/bd')


module.exports = function setupUsuarioModel(config) {
    const sequelize = setupDataBase(config)

    return sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pass: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}