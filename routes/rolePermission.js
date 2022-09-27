

const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const checkAuth = require('../middleware/checkAuth');
const rolePermission = require('../controller/rolePermission')

route.post('/add/role',errorWrap.wrapper(rolePermission.addRole));

route.get('/role',errorWrap.wrapper(rolePermission.getRoles));

route.delete('/delete/role/:id',errorWrap.wrapper(rolePermission.deleteRole));;


module.exports = route;

