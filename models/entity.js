module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('entity', {
        
        entityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'entity',
        timestamps: false
    });


    Entity.associate = function(models) {
        Entity.hasMany(models.permission,{foreignKey:'entity_Id', as:'permission'});
    }

    return Entity;
}
