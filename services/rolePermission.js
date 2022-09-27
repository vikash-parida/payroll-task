const models = require("../models")
const sequelize = models.sequelize
const Sequelize = models.Sequelize
const Op = Sequelize.Op;
const _ = require('underscore')

exports.addRole = async (req, res) => {
  const { roleName, description } = req.body
  const roleExists = await models.role.findOne({ where: { roleName: roleName } })
  if (roleExists) return { error: true, message: 'Role already exist' }
  const role = await models.role.create({ roleName, description })
  return { error: false, role }
}

exports.deleteRole = async (req, res) => {
  const roleId = req.params.id
  const roleExists = await models.role.findOne({ where: { id: roleId } })
  if (!roleExists)
    return { error: true, message: 'Role does not exist' }
  const role = await models.role.destroy({ where: { id: roleId } })
  return { error: false, role }
}

