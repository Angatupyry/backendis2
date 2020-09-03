module.exports = function (sequelize, DataTypes) {
    return sequelize.define('linea_base_detalle', {
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
        linea_base_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'linea_base',
                key: 'id'
            }
        }
    }, {
        tableName: 'linea_base_detalle',
        timestamps: false,
        schema: 'public'
    });
}