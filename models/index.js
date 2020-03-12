const Sequelize = require('sequelize');

const sequelize = new Sequelize('gestion_proyecto', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        //
        module.exports = sequelize;
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;