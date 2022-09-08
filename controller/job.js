const models = require("../models")
const sequelize = models.sequelize
const Sequelize = models.Sequelize
const Op = Sequelize.Op;
const moment = require('moment');
const service = require('../services/job')

exports.createJob = async (req, res) => {
    const data=  await service.createJob(req)
    if(data.error==false){
        res.status(201).json({ message: "Job Created", data })
    }else{
        res.status(404).json(data)
    }
}

exports.getJobs = async (req, res) => {
    const data = await service.getJobs(req)
    if(data.error==false){
        res.status(200).json({ message: "Success", data })
    }else{
        res.status(404).json(data)
    }
}

exports.applyJob = async (req, res) => {
    const data=  await service.applyJob(req)
    if(data.error==false){
        res.status(201).json({ message: "Applied to job", data })
    }else{
        res.status(404).json(data)
    }
}

exports.getJobsAppliedByUser = async (req, res) => {
    const data=  await service.getJobsAppliedByUser(req)
    if(data.error==false){
    res.status(201).json({ message: "success", data })
    }
    else{
        res.status(404).json(data)
    }
}

exports.getAllApplicantForJob = async (req, res) => {
    const data=  await service.getAllApplicantForJob(req)
    if(data.error==false){
    res.status(201).json({ message: "success", data })
    }
    else{
        res.status(404).json(data)
    }
}
 exports.getAllCandidatesWithJobs = async (req, res) => {
    const data=  await service.getAllCandidatesWithJobs(req)
    if(data.error==false){
    res.status(201).json({ message: "success", data })
    }
    else{
        res.status(404).json(data)
    }
}

exports.deleteJob = async (req, res) => {

    const data= await service.deleteJob(req)
    if(data.error==false){
    res.status(201).json({ message: "Job deleted" })
    }
    else{
        res.status(404).json(data)
    }
}