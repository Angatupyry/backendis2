module.exports = function (sequelize, DataTypes) {
    return sequelize.define('fase', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estado',
                key: 'id'
            }
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'proyecto',
                key: 'id'
            }
        }
    }, {
        tableName: 'fase',
        timestamps: false,
        schema: 'public'
    });
}