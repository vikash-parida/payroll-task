const job = require('../controller/job')
const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
//const { use Validation } = require('../validation/user');
const validationError = require('../middleware/validationError')
const checkAuth = require('../middleware/checkAuth');
const checkPermission = require('../middleware/checkPermission');


route.get('/',checkAuth,checkPermission(3),errorWrap.wrapper(job.getJobs))

route.get('/applied-jobs',checkAuth,checkPermission(3),errorWrap.wrapper(job.getJobsAppliedByUser)) //for user

route.get('/job-applicants',checkAuth,checkPermission(2),errorWrap.wrapper(job.getAllApplicantForJob)) //for recruiter

route.get('/candidates-job', checkAuth,checkPermission(1),errorWrap.wrapper(job.getAllCandidatesWithJobs)) //for admin

route.post('/',checkAuth,checkPermission(2),errorWrap.wrapper(job.createJob))

route.post('/apply-job/:jobId',checkAuth,checkPermission(3),errorWrap.wrapper(job.applyJob))

route.delete('/delete/:id',checkAuth,checkPermission(1),errorWrap.wrapper(job.deleteJob))



module.exports = route;   