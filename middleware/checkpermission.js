const checkPermission = (...allowedRoles)=>{
    return(req, res, next) => {
        if(!req.userData.role_id){
            return res.status(401).send("Unauthorized");
        }
        const rolesArray = [...allowedRoles];
        // console.log(req.userData.role_id)
        // console.log(rolesArray);
        const result = rolesArray.includes(req.userData.role_id);
        // console.log(result)
        if (!result) {
            return res.status(403).json({err:"Access denied"});            
        }
        next();
    }
}

module.exports = checkPermission;