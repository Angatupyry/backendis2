module.exports = function (sequelize, DataTypes) {
    return sequelize.define('rol_permiso', {
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rol',
                key: 'id'
            }
        },
        permiso_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'permiso',
                key: 'id'
            }
        }
    }, {
        tableName: 'rol_permiso',
        timestamps: false,
        schema: 'public'
    });
}