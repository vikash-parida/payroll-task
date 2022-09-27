const service = require('../services/user');
const { sendEmail } = require('../utils/sendMail');
const xlxs = require('xlsx')
const moment = require('moment')
const ExcelJs = require('exceljs');

exports.adminSignUp = async (req, res) => {
    const { email, password ,name ,roleId} = req.body;

    const emailExist = await service.emailUsed(email);

    if (emailExist) {
        return res.status(400).json({
            msg: "email already used"
        });
    }

    const user = await service.adminSignUp(email, password, name,roleId);
    res.status(201).json({
        msg:"Admin user succesfully created",
        user
    });
}

exports.userSignUp = async (req, res) => {
    const { email, password ,name ,roleId} = req.body;

    const emailExist = await service.emailUsed(email);

    if (emailExist) {
        return res.status(400).json({
            msg: "email already used"
        });
    }

    const user = await service.userSignUp(email, password, name,roleId);
    res.status(201).json({
        msg:"User succesfully created",
        user
    });
}

exports.addRecruiter = async (req, res) => {
    const { email, password ,name, roleId } = req.body;

    const emailExist = await service.emailUsed(email);

    if (emailExist) {
        return res.status(400).json({
            msg: "email already used"
        });
    }

    const user = await service.addRecruiter(email, password, name ,roleId);
    res.status(201).json({
        msg:"Recruiter added created",
        user
    });
}


exports.getUsers = async(req,res)=>{
    const users = await service.getUsers(req);
    if (!users.length) {
        return res.status(404).json({
            msg: "No user not found"
        });
    }
    res.status(200).json({
        msg:"Success",
        users
    });
}

exports.exportCandidates = async(req,res)=>{
    const users =await service.exportCandidates();
    
    if (!users.length) {
        return res.status(404).json({
            msg: "No user not found"
        });
    }

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Candidates');
    worksheet.columns = [
        {header: 'S.no', key: 's_no', width: 4},
        {header: 'Email', key: 'email', width: 20},
        {header: 'name', key: 'name', width: 10},
    ];
    let count = 1;
    users.forEach(user => {
        (user).s_no = count;
        worksheet.addRow(user);
        count += 1;
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });
    const data = await workbook.xlsx.writeFile('candidates.xlsx')
    res.download("candidates.xlsx");
}

exports.exportRecruiter = async(req,res)=>{
    const users =await service.exportRecruiter();
    
    if (!users.length) {                            
        return res.status(404).json({
            msg: "No user not found"
        });
    }

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Recruiter');
    worksheet.columns = [
        {header: 'S.no', key: 's_no', width: 4},
        {header: 'Email', key: 'email', width: 20},
        {header: 'name', key: 'name', width: 10},
    ];
    let count = 1;
    users.forEach(user => {
        (user).s_no = count;
        worksheet.addRow(user);
        count += 1;
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });
    const data = await workbook.xlsx.writeFile('recruiter.xlsx')
    res.download('recruiter.xlsx');
}

exports.exportApplicant =  async(req,res)=>{
    const applicants =await service.exportApplicant(req);
    //console.log(applicants)
    if (applicants.data.length==0) {
        return res.status(404).json({
            msg: "No user not found"
        });
    }

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Applicants');
    worksheet.columns = [
        {header: 'S.no', key: 's_no', width: 4},
        {header: 'Email', key: 'email', width: 20},
        {header: 'Name', key: 'name', width: 10},
        {header: 'Jobs', key: 'job', width: 20},
    ];
    let count = 1;
    applicants.data.forEach(user => {
        (user).s_no = count;
        worksheet.addRow(user);
        count += 1;
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
    });
    const data = await workbook.xlsx.writeFile('applicants.xlsx')
    res.download('applicants.xlsx');

}

exports.forgotPassword = async(req,res) => {
    
    const {email} = req.body;

    const user = await service.emailUsed(email);
    if (!user) {
        return res.status(404).json({
            msg: "Email not found!"
        });
    }

    const forgetPassword = await service.forgotPassword(user);
    if(!forgetPassword.result){
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }else{
        res.status(200).json({
            message:forgetPassword.message
        });
    }
}

exports.resetPassword = async(req,res) => {

    const {email} = req.body;
    const user = await service.emailUsed(email);
    if (!user) {
        return res.status(404).json({
            msg: "Email not found!"
        });
    }

    const result = await service.resetPassword(req,user);

    if (result.error==true) {
        return res.status(400).json({
            message:result.message
        });
    }else{
        res.status(200).json({
            message:"Password updated successfully"
        });
    }
}

exports.removeUser = async (req, res) => {
    const { id } = req.params;

    const result = await service.remooveUser(id);

    if (result.err) {
        return res.status(400).json({
            err:result.err
        });
    }
    res.status(201).json({
        msg:"User deleted successfully",
        result
    });
}

exports.removeUser = async (req, res) => {
    const { id } = req.params;

    const result = await service.removeUser(id);

    if (result.err) {
        return res.status(400).json({
            err:result.err
        });
    }
    res.status(201).json({
        msg:"User deleted successfully",
        result
    });
}
