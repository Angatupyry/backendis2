module.exports = function (sequelize, DataTypes) {
    return sequelize.define('prioridad_item', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'prioridad_item',
        timestamps: false,
        schema: 'public'
    });
}