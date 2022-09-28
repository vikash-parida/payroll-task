const job = require('../controller/job')
const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const checkAuth = require('../middleware/checkAuth');
const checkPermission = require('../middleware/checkPermission');


route.get('/',checkAuth,checkPermission,errorWrap.wrapper(job.getJobs))

route.get('/applied-jobs',checkAuth,checkPermission,errorWrap.wrapper(job.getJobsAppliedByUser)) //for user

route.get('/job-applicants',checkAuth,checkPermission,errorWrap.wrapper(job.getAllApplicantForJob)) //for recruiter

route.get('/candidates-job',checkAuth,checkPermission,errorWrap.wrapper(job.getAllCandidatesWithJobs)) //for admin

route.post('/',checkAuth,checkPermission,errorWrap.wrapper(job.createJob))

route.post('/apply-job/:jobId',checkAuth,checkPermission,errorWrap.wrapper(job.applyJob))

route.delete('/delete/:id',checkAuth,checkPermission,errorWrap.wrapper(job.deleteJob))


/**
 * @swagger
 * /job/:
 *     get:
 *      summary: show all jobs in this job-portal
 *      descriptions: get all job list
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      responses:
 *        200:   
 *          description: this api is get 
 *        404:
 *          description: jobs data not found 
 *  
 * 
 * /job/applied-jobs/:
 *     get:
 *      summary: user cen see all thay applied jobs
 *      description:  get all applied jobs
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: all applied jobs
 *        404:
 *          description:  applied jobs data not found
 * 
 * /job/applied-jobs/delete/:
 *     delete:
 *      summary: admin can delete job
 *      description: admin can delete jobs
 *      security:
 *       - bearerAuth: []
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: query
 *         description: Id of job to delete
 *         required: true
 *         type: integer
 *         responses:
 *          200:
 *           description: job delete successfully
 *          400:
 *           description: job not found
 */       

module.exports = route;   