module.exports = function (sequelize, DataTypes) {
    return sequelize.define('proyecto', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('now')
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'estado',
                key: 'id'
            }
        }
    }, {
        tableName: 'proyecto',
        timestamps: false,
        schema: 'public'
    });
}