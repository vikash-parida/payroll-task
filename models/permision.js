module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('permission', {
        actionName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        entity_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        baseUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'permission',
        timestamps: false
    });


    Permission.associate = function (models) {
        Permission.belongsTo(models.entity, { foreignKey: 'entity_Id', as: 'entity' });
        // Permission.belongsToMany(models.role, { through: models.rolePermission, });
    }

    return Permission;
}
