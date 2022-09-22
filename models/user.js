
const bcrypt = require('bcrypt');

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

     User.associate = function (models) {
           User.belongsTo(models.role, { foreignKey: 'role_id' });
           User.belongsToMany(models.job, {through:models.user_job,foreignKey: 'job_id'});
           User.hasMany(models.user_otp,{foreignKey: 'user_id'})
        }


        User.beforeCreate(function (user, options, cb) {
          if (user.password) {
            return new Promise((resolve, reject) => {
              bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                  return err;
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                  if (err) {
                    return err;
                  }
                  user.password = hash;
                  return resolve(user, options);
                });
              });
            });
          }
        });
      
        // THIS HOOK WILL RUN BEFORE UPDATE
        User.beforeUpdate(function(user, options, cb){
          if(user.password){
            return new Promise((resolve, reject) => {
              bcrypt.genSalt(10, function(err, salt){
                if(err) return err
                bcrypt.hash(user.password, salt, function(err, hash){
                  if(err) return err
                  user.password = hash
                  return resolve(user, options)
                })
              })
            })
          }
        })
      

        User.prototype.comparePassword = function (passw, cb) {
          return new Promise((resolve, reject) => {
            bcrypt.compare(passw, this.password, function (err, isMatch) {
              if (err) {
                return err;
              }
              return resolve(isMatch);
            });
          });
        };

      return User;
    } 