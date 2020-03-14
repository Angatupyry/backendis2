module.exports = function (sequelize, DataTypes) {
    return sequelize.define('permiso', {
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
        tableName: 'permiso',
        timestamps: false,
        schema: 'public'
    });
}