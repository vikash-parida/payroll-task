const auth = require('../controller/auth')
const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const { userValidation } = require('../validation/user');
const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');


route.post('/sign-in',userValidation,validationError,errorWrap.wrapper(auth.signIn));

route.post('/sign-out',checkAuth,errorWrap.wrapper(auth.signOut));


module.exports = route;
