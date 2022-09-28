

const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const checkAuth = require('../middleware/checkAuth');
const rolePermission = require('../controller/rolePermission')

route.post('/add/role',checkAuth,errorWrap.wrapper(rolePermission.addRole));

route.get('/role',checkAuth,errorWrap.wrapper(rolePermission.getRoles));

route.delete('/delete/role/:id',checkAuth,errorWrap.wrapper(rolePermission.deleteRole));



module.exports = route;

