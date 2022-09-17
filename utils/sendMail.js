const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  port: process.env.SMTP_PORT,
  secure: false,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

let sendEmail = async (to, subject, message) => {
  try{
    let mailOptions = {
        from: "admin@jobportal.com",
        to: to,
        subject: subject,
        html: message,
      };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
} catch (error) {
    console.log(error.message, "email not sent");
}
};

module.exports = {
  sendEmail: sendEmail,
};