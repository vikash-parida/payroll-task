const models = require('../models');
const { Sequelize } = models;
const { sequelize } = models;
const { Op } = Sequelize;
const rolePermission = require('../services/rolePermission');

exports.addRole = async (req, res) => {
    const data=await rolePermission.addRole(req)
    if(data.error==false){
      res.status(201).json({ message: "Role created",data })
    }else{
      res.status(400).json(data)  }
  }

exports.getRoles = async (req, res) => {
    const roledata = await models.role.findAll({})
    if (roledata) {
        res.status(200).json({roledata})
    } else {
      res.status(400).json({roledata})
    }
  }

exports.deleteRole = async (req, res) => {
    const data=await rolePermission.deleteRole(req)
    if(data.error==false){
      res.status(201).json({ message: "Role deleted",data })
    }else{
      res.status(400).json(data)  }
  }

