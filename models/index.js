var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
const asdf = require('../config/bd.json')
var env = process.env.NODE_ENV || "development";
console.log(env)
console.log(__dirname)

var config = require('../config/bd.json')[env];
console.log(config)
var db = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('gestion_proyecto', 'admin', 'admin', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 9,
//         min: 0,
//         idle: 10000
//     }
// });
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         //
//         module.exports = sequelize;
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// module.exports = sequelize;