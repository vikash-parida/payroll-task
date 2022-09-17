module.exports = (sequelize, Sequelize) => {
    const UserOtp = sequelize.define('user_otp', {
       otp: {
        type: Sequelize.STRING,
      },
      expiry_time: {
        type: Sequelize.DATE,
      },
    }, {
      freezeTableName: true,
      tableName: "user_otp",
      timestamps: false
    })
    
    UserOtp.associate = function (models) {
        UserOtp.belongsTo(models.user,{foreignKey: 'user_id'});
      }
  
    return UserOtp
  }