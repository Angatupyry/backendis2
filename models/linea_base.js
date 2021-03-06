module.exports = function (sequelize, DataTypes) {
    return sequelize.define('linea_base', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'proyecto',
                key: 'id'
            }
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'estado',
                key: 'id'
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'linea_base',
        timestamps: false,
        schema: 'public'
    });
}