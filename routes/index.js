const express = require('express');
const router = express.Router();




const user = require('./user')
const auth = require('./auth')
const job = require('./job')
const rolePermission = require('./rolePermission')

router.use('/user', user);
router.use('/auth', auth);
router.use('/job', job);

router.use('/rolePermission',rolePermission)




module.exports = router;