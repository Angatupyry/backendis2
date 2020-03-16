module.exports = function (sequelize, DataTypes) {
    return sequelize.define('estado', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_tabla: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'estado',
        timestamps: false,
        schema: 'public'
    });
}