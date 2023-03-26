const nodeMailer = require('../nodemailer');
const Scholar = require('../../database/models/scholar.model');

exports.newRequest = async (request,user) => {
    nodeMailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : user.email,
        subject : `Supervisor Request result from ${request.supervisor}`,
        html : `<h2>Greetings ${user.fullName} your request has been ${request.supervisor_status} from ${request.supervisor}</h2>`
    },(err,info)=>{
        if(err){
            console.log('error');
            return;
        }

        console.log('meds;dg' , info);
        return;
    });
}