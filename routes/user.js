const user = require('../controller/user')
const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const { userValidation } = require('../validation/user');
const validationError = require('../middleware/validationError')
const checkAuth = require('../middleware/checkAuth');
const checkPermission = require('../middleware/checkPermission');


route.post('/',userValidation,validationError,errorWrap.wrapper(user.userSignUp));

route.post('/admin',userValidation,validationError,errorWrap.wrapper(user.adminSignUp));

route.post('/add-recruiter',userValidation,validationError,errorWrap.wrapper(user.addRecruiter));

route.post('/forgot-password',errorWrap.wrapper(user.forgotPassword));

route.put('/reset-password',errorWrap.wrapper(user.resetPassword));

route.get('/',checkAuth,checkPermission,errorWrap.wrapper(user.getUsers));

route.get('/export-candidates',checkAuth,checkPermission,errorWrap.wrapper(user.exportCandidates));

route.get('/export-recruiter',checkAuth,checkPermission,errorWrap.wrapper(user.exportRecruiter));

route.get('/export-applicant',checkAuth,checkPermission,errorWrap.wrapper(user.exportApplicant));

route.delete('/:id',checkAuth,checkPermission,errorWrap.wrapper(user.removeUser));



module.exports = route;
