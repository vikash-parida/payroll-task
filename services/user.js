const models = require('../models')
const { sendEmail } = require('../utils/sendMail');
const moment = require('moment');
const { sequelize } = require('../models');
const Sequelize = models.Sequelize
const Op = Sequelize.Op;
const {paginationWithFromToAndSort} = require('../utils/pagination')
const { QueryTypes } = require("sequelize");
const redisClient = require('../utils/redis')


const emailUsed = async (email) => {
    const emailUsed = await models.user.findOne({
        where: { email }
    }
    )
    return emailUsed
}
const adminSignUp = async (email, password, name,roleId) => {
    const user = await models.user.create({
        email,
        password,
        name,
        role_id:roleId
    }
    )
    return user;
}

const userSignUp = async (email, password, name ,roleId) => {
    const user = await models.user.create({
        email,
        password,
        name,
        role_id:roleId
    }
    )
    return user;
}

const addRecruiter = async (email, password, name,roleId) => {
    const recruiter = await models.user.create({
        email,
        password,
        name,
        role_id:roleId
    }
    )
    return recruiter;
}

const getUsers = async (req) => {
    const { search, offset, pageSize } = paginationWithFromToAndSort(
        req.query.search, req.query.from, req.query.to);
    
    if (!req.query.from || !req.query.to) {
        const userRedis = await redisClient.get('users')
    if (userRedis) {
        console.log("from redis....",userRedis)
        return JSON.parse(userRedis)
    }
    }


    if(req.query.type = "raw"){
    const users = await models.sequelize.query(`
    SELECT u.name,u.email FROM user u
    limit ${pageSize}
    offset ${offset}
      `, {
        type: QueryTypes.SELECT
    })
    await redisClient.setEx('users', 60, JSON.stringify(users));
    return users

    }else{
    const users = await models.user.findAll({
        limit: pageSize,
        offset: offset,
        attributes:['name','email'],
    });
     await redisClient.setEx('users', 60, JSON.stringify(users));
    return users
}
} 

const exportCandidates = async () => {
    const users = await models.user.findAll({
        where:{role_id:3},
        attributes:['name','email']
    })
    return users
}

const exportRecruiter = async () => {
    const users = await models.user.findAll({
        where:{role_id:2},
        attributes:['name','email']
    })
    return users
}

const exportApplicant = async(req) =>{
    const { search, offset, pageSize } = paginationWithFromToAndSort(req.query.search, req.query.from, req.query.to);
    if (req.query.type == "raw") {
        const data = await models.sequelize.query(`
        SELECT u.name,u.email,GROUP_CONCAT( j.job_name ) job FROM user u 
        INNER JOIN user_job uj
            ON uj.user_id = u.id 
        INNER JOIN job j
            ON j.id = uj.job_id
		group by u.id;
          `, {
            type: QueryTypes.SELECT
        })
        return { error: false, data }

    } else {
        const data = await models.user.findAll({
            limit: pageSize,
            offset: offset,
            attributes: ['name', 'email'],
            include: [{
                model: models.job,
                attributes: [ [sequelize.fn('GROUP_CONCAT', sequelize.col('job_name')), 'job']],
                required:true
            }]
        })
        return { error: false, data }
    }
}

const forgotPassword = async (user) => {

    const otp = Math.floor(1000 + Math.random() * 9000);
        
    let expiry_time=moment.utc().add(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");
    

    await models.user_otp.destroy({ where: { user_id : user.id } })

    const result = await models.user_otp.create({otp, expiry_time,user_id : user.id });
   
    const content = `Your OTP for password change request is ${otp}. It will be valid for 5 minutes.`
    await sendEmail(user.email, "Password reset request", content)
    return {
        message : "OTP sent to registered Email Id",
        result
    }
} 

const resetPassword = async (req, user) => {
        const { otp, password } = req.body
        // console.log(moment())
     const now = moment.utc().format("YYYY-MM-DD HH:mm:ss");



        const verifyOtp = await models.user_otp.findOne({
            where: {
                user_id: user.id,
                otp,
                expiry_time: { [Op.gte]: now },
            }
        })
        console.log(verifyOtp)
        if (!verifyOtp) {
            return {error:true ,message:'OTP invalid or expired'}
        }

        let data = await models.user.update({
            password: password
        },
            {
                where: {
                    email: user.email
                },
                individualHooks: true
            })
        return {error:false,data}
}

const removeUser = async (id) => {

    const user = await models.user.findOne({
        where :{id}
    })

    if (!user) {
        return {err:"User not found"}
    }

    if (user.role_id==1) {
        return {err:"Cannot delete an admin account"}
    }

    const result = await models.user.destroy({
        where:{id}
    }
    )
    return result;
}



module.exports = {
    adminSignUp:adminSignUp,
    userSignUp: userSignUp,
    emailUsed: emailUsed,
    getUsers:getUsers,
    forgotPassword:forgotPassword,
    resetPassword:resetPassword,
    addRecruiter:addRecruiter,
    removeUser:removeUser,
    exportCandidates:exportCandidates,
    exportRecruiter:exportRecruiter,
    exportApplicant:exportApplicant
}