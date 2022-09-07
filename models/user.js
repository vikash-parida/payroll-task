module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
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
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role_id:{
          type:DataTypes.INTEGER,
          allowNull:false
        }
    
      }, { 
        timestamps: true,
        tableName: 'user',
        freezeTableName: true
        });

      return User;
    }