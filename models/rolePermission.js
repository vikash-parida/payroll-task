module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('rolePermission', {
        role_Id: {
            type: DataTypes.INTEGER,
        },
        permission_Id: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'rolePermission',
        timestamps: false
    });

    RolePermission.associate = function (models) {
        RolePermission.belongsTo(models.role, { foreignKey: 'role_id', as: 'role' });
        RolePermission.belongsTo(models.permission, { foreignKey: 'permission_Id', as: 'permission' })
    }

    return RolePermission;
}