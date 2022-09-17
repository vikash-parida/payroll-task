// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }, { 
    timestamps: false,
    tableName: 'role',
    freezeTableName: true
    }
  );

  Role.associate = function (models) {
    Role.hasMany(models.user, { foreignKey: 'role_id' });  
}
  return Role;
}