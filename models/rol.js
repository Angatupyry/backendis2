module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rol', {
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
        tableName: 'rol',
        timestamps: false,
        schema: 'public'
    });
}