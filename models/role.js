// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    roleName: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    tableName: "role",
    timestamps: false
  })

  Role.associate = function (models) {
    Role.hasMany(models.user, { foreignKey: "role_id" });
    // Role.belongsToMany(models.permission,{through:models.rolePermission })
  }

  return Role
}