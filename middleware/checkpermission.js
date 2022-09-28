const models = require("../models")
module.exports = async (req, res, next) => {
   //console.log("....sccwcw.cewcw.............",req.userData);
    try {
        const role = req.userData.role_id
       // console.log("user..id..",role);
        const result = await models.rolePermission.findAll({
            where: {role_Id: role},
            include: [
                {
                    model: models.permission,
                    as:'permission',
                }
            ]
        })
        let match = false;
        result.map((e) => {
            //console.log(e.dataValues.permission.dataValues.method);
            if (e.dataValues.permission.dataValues.method === req.method && e.dataValues.permission.dataValues.baseUrl === req.baseUrl && e.dataValues.permission.dataValues.path == req.url) {
                match = true
            }
        })
        if(match) {
            next()
        } else {
            res.status(403).json({message:`You don't have permission for this!`})
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({message: "Please signin again!" })
    }
}