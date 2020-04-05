module.exports = function (sequelize, DataTypes) {
    return sequelize.define('item', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        version: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prioridad_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'prioridad_item',
                key: 'id'
            }
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estado',
                key: 'id'
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'proyecto',
                key: 'id'
            }
        },
        id_tarea_padre: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'item',
                key: 'id'
            }
        }
    }, {
        tableName: 'item',
        timestamps: false,
        schema: 'public'
    });
}