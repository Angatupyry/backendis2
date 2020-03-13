module.exports = function (sequelize, DataTypes) {
    return sequelize.define('usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'is_usuario',
        timestamps: false,
        schema: 'public'
    });
}