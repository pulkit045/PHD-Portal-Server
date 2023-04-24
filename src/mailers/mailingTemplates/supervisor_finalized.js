const nodeMailer = require('../nodemailer');
const Scholar = require('../../database/models/scholar.model');

exports.newRequest = async (data) => {
    console.log(data);

    nodeMailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : data.Scholar_email,
        subject : ` ${data.Scholar_name} you have been assigned a Supervisor`,
        html : `<h2>Congratulations ${data.Scholar_name} , ${data.Scholar_supervisor} has been assigned as your thesis Supervisor</h2>`
    },(err,info)=>{
        if(err){
            console.log('error' , err);
            return;
        }
        return;
    });
}