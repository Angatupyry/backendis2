module.exports = function (sequelize, DataTypes) {
    return sequelize.define('usuario', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: 'usuario_username_key'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_alta: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        proyecto_ud: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'proyecto',
                key: 'id'
            }
        },
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rol',
                key: 'id'
            }
        }

    }, {
        tableName: 'usuario',
        timestamps: false,
        schema: 'public'
    });
}