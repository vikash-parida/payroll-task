module.exports = (sequelize,DataTypes)=>{
    const UserJob = sequelize.define('user_job',{
        job_id:DataTypes.INTEGER,
        user_id:DataTypes.INTEGER,
    },{
        tableName: 'user_job',
        freezeTableName:true,
        timestamps:false

    })
    return UserJob
}