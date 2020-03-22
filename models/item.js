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
            allowNull: false
        },
        fase_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fase',
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
        },
        es_padre: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    }, {
        tableName: 'item',
        timestamps: false,
        schema: 'public'
    });
}