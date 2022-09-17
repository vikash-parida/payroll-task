const express = require('express');
const router = express.Router();




const user = require('./user')
const auth = require('./auth.js')
const job = require('./job')

router.use('/user', user);
router.use('/auth', auth);
router.use('/job', job);




module.exports = router;