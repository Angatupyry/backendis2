var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
console.log(env)
console.log(__dirname)

var config = require('../config/bd.json')[env];


var db = {};

const desarrollo = {
    database: 'gestion_proyecto',
    username: 'postgres',
    pass: 'postgres',
    host: 'localhost'
}

const produccion = {
    database: 'drcj8chfol8b',
    username: 'itdjvarewhxkyk',
    pass: '789f78a217e2593cabeb2a9d32d134f17bb6bea041c59be81eb853dcdeb993ee',
    host: 'ec2-23-23-245-89.compute-1.amazonaws.com'
}


const sequelize = new Sequelize(desarrollo.database, desarrollo.username, desarrollo.pass, {
    host: desarrollo.host,
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
})

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