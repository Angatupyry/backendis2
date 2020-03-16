module.exports = function (sequelize, DataTypes) {
    return sequelize.define('linea_base', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'item',
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
        }
    }, {
        tableName: 'linea_base',
        timestamps: false,
        schema: 'public'
    });
}