module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('permission', {
        actionName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
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
    });


    // Permission.associate = function (models) {
    //     Permission.belongsToMany(models.role, { through: models.rolePermission });
    // }

    return Permission;
}
