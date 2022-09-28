const models = require("../models")
const sequelize = models.sequelize
const Sequelize = models.Sequelize
const Op = Sequelize.Op;
const moment = require('moment');
const { QueryTypes } = require("sequelize");
const { sendEmail } = require('../utils/sendMail')
const { paginationWithFromToAndSort } = require('../utils/pagination')
const redisClient = require('../utils/redis')



exports.createJob = async (req, res) => {
    const { job_name, description } = req.body
     console.log("userdata......",req.userData)

    if (req.query.type == "raw") {
        if (!req.userData) {
            return { error: true, message: 'Please signin first' }
        }
        const job = await models.sequelize.query(`INSERT INTO "job" ("job_name","description","created_by")
            VALUES ('${job_name}','${description}','${req.userDeta.id}')`)
        return job

    }
    else {
        if (!req.userData) {
            return { error: true, message: 'Please signin first' }
        }

        const data = await models.job.create({ job_name, description, created_by: req.userData.id, isActive: true })
        return { error: false, data }
    }
}

exports.getJobs = async (req) => {

    const { search, offset, pageSize } = paginationWithFromToAndSort(
        req.query.search,
        req.query.from,
        req.query.to
    );
    if (req.query.type == "raw") {
        const data = await sequelize.query(`select * from "job"`)
        return data
    } else {
        const data = await models.job.findAll({
            where:
            {
                isActive: true
            },
            limit: pageSize,
            offset: offset,
            order: [['id', "DESC"]]
        })

        return { error: false, data }
    }
}


exports.applyJob = async (req) => {
   
    const { jobId } = req.params;
    const { email } = req.userData;

    if (req.query.type == "raw") {

        const findUser = await models.sequelize.query(`SELECT * FROM user u
        WHERE u.email = '${email}'
        `, {
            type: QueryTypes.SELECT
        });

        if (!findUser) {
            return { error: true, message: 'Email does no exist' };
        }

        const job = await models.sequelize.query(`SELECT * FROM job WHERE id = '${jobId}'	
        `, {
            type: QueryTypes.SELECT
        });

        if (job.length == 0) {
            return { error: true, message: `Job does not exist` }
        }

        const recruiter = await models.sequelize.query(`SELECT * FROM user
            WHERE id ='${job[0].created_by}'`, {
            type: QueryTypes.SELECT
        });

        const alreadyApplied = await models.sequelize.query(`
        SELECT * from user_job where user_id = '${findUser[0].id}' and job_id ='${job[0].id}'; 
        `, {
            type: QueryTypes.SELECT
        });

        if (alreadyApplied.length !== 0) {
            return { error: true, message: 'You have already applied for this job' }
        }

        const result = await models.user_job.create({
            user_id: findUser[0].id,
            job_id: job[0].id
        });

        const userText = `<p>${findUser[0].name},</p>
        <p>Thank you for applying for the position of ${job[0].job_name}.
        You will be notified if your Cv is shorlisted</p>
        <p>Thanks and Regards</p>`

        const recruiterText = `<p>Hello ${recruiter[0].name},</p>
            <p>Candidate ${findUser[0].name} has applied for position ${job[0].job_name}.</p>
            <p>Thanks and Regards</p>`

        sendEmail(findUser[0].email, "APPLICATION SUCCESS", userText);
        sendEmail(recruiter[0].email, "APPLICATION RECIEVED", recruiterText)
        return { error: false, result }
    } else {
        let findUser = await models.user.findOne({
            where: { email }
        });
        if (!findUser) {
            return { error: true, message: 'Email does no exist' };
        }

        const job = await models.job.findOne({
            where: { id: jobId }
        });

        if (!job) {
            return { error: true, message: 'Job not found' }

        }

        const recruiter = await models.user.findOne({
            where: { id: job.created_by }
        });

        if (!recruiter) {
            return { error: true, message: 'recruiter not found' }
        }

        const alreadyApplied = await models.user_job.findOne({
            where: {
                user_id: findUser.id,
                job_id: job.id
            }
        });

        if (alreadyApplied) {
            return { error: true, message: 'You have already applied for this job' }
        }

        const result = await models.user_job.create({
            user_id: findUser.id,
            job_id: job.id
        });

        const userText = `<p>${findUser.name},</p>
        <p>Thank you for applying for the position of ${job.job_name}.
        You will be notified if your Cv is shorlisted</p>
        <p>Thanks and Regards</p>`

        const recruiterText = `<p>Hello ${recruiter.name},</p>
            <p>Candidate ${findUser.name} has applied for position ${job.job_name}.</p>
            <p>Thanks and Regards</p>`

        sendEmail(findUser.email, "APPLICATION SUCCESS", userText);
        sendEmail(recruiter.email, "APPLICATION RECIEVED", recruiterText)
        return { error: false, result }
    }
}

exports.getJobsAppliedByUser = async (req) => {
    const { search, offset, pageSize } = paginationWithFromToAndSort(req.query.search, req.query.from, req.query.to);
    const userId = req.userData.id;
    if (req.query.type == "raw") {
        const data = await models.sequelize.query(`
        SELECT u.name,u.email,j.job_name,j.description FROM user u 
        INNER JOIN user_job uj
            ON uj.user_id = u.id 
        INNER JOIN job j
            ON j.id = uj.job_id  
        Where u.id = ${userId} ;
          `, {
            type: QueryTypes.SELECT
        })
        return { error: false, data }

    } else {
        const data = await models.user.findOne({
            where: { id: userId },
            limit: pageSize,
            offset: offset,
            attributes: ['name', 'email'],
            include: [{
                model: models.job,
                attributes: ['job_name', 'description']
            }]
        })
        return { error: false, data }
    }
}

exports.getAllApplicantForJob = async (req) => {
        const { search, offset, pageSize } = paginationWithFromToAndSort(req.query.search, req.query.from, req.query.to);
        const userId = req.userData.id;

        const allApplicant = await redisClient.get('data')
        if (allApplicant) {
             console.log("from redis....",allApplicant)
            return JSON.parse(allApplicant)
        }
        
    

        if (req.query.type == "raw") {
            const data = await models.sequelize.query(`
            SELECT u.name,u.email,j.job_name,j.description FROM job j 
                INNER JOIN user_job uj
                    ON uj.job_id = j.id 
                INNER JOIN user u
                    ON u.id = uj.user_id  
            WHERE j.created_by = ${userId} ;
          `, {
                type: QueryTypes.SELECT
            })
            await redisClient.setEx('data', 60, JSON.stringify(data));
            return {error:false,data}

        } else {
            const data = await models.job.findAll({
                where: { created_by: userId },
                limit: pageSize,
                offset: offset,
                attributes:['job_name','description'],
                include: [{
                    model: models.user,
                    attributes:['name','email']
                }]
            })
            await redisClient.setEx('data', 60, JSON.stringify(data));
            return {error:false,data}
        }
    }

    exports.getAllCandidatesWithJobs = async (req) => {
        const { search, offset, pageSize } = paginationWithFromToAndSort(req.query.search, req.query.from, req.query.to);
        
        const allApplicant = await redisClient.get('data')
        if (allApplicant) {
            console.log("from redis....",allApplicant)
            return JSON.parse(allApplicant)
        }
        
        if (req.query.type == "raw") {
            const data = await models.sequelize.query(`
            SELECT u.name,u.email,j.job_name,j.description FROM user u 
            INNER JOIN user_job uj
                ON uj.user_id = u.id 
            INNER JOIN job j
                ON j.id = uj.job_id;
    
              `, {
                type: QueryTypes.SELECT
            })
            await redisClient.setEx('data', 60, JSON.stringify(data));
            return { error: false, data }
    
        } else {
            const data = await models.user.findAll({
                limit: pageSize,
                offset: offset,
                attributes: ['name', 'email'],
                include: [{
                    model: models.job,
                    attributes: ['job_name', 'description']
                }]
            })
            await redisClient.setEx('data', 60, JSON.stringify(data));
            return { error: false, data }
        }
    }
    
    exports.deleteJob = async (req, res) => {
        const id = req.params.id
        const job = await models.job.findOne({where:{id}});
        if(!job){
            return {error:true,msg:"job not found"}            
        }
        
        if (req.query.type == "raw") {
            const job = await models.sequelize.query(`
            DELETE FROM job WHERE id ='${id}'`)
            return job
        } else {
            const data = await models.job.destroy({ where: { id } })
            return {error:false,data}
        }
    }