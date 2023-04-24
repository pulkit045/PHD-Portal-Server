const nodeMailer = require('../nodemailer');
const Scholar = require('../../database/models/scholar.model');

exports.newRequest = async (data) => {
    nodeMailer.transporter.sendMail({
        from: process.env.EMAIL,
        to : data.supervisormail,
        subject : ` ${data.scholarname} requested for  Supervisor`,
        html : `<h2>Greetings ${data.supervisorname} you have received Supervisor request from ${data.scholarname} </h2>`
    },(err,info)=>{
        if(err){
            console.log('error' , err);
            return;
        }

        // console.log('messgae : )' , info);
        return;
    });
}